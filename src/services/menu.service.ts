import { it } from "node:test";
import { MenuRepository } from "../repositories/menu.repos";
import { IuserData } from "../types/types";
import { IMenuData } from "../interface/interfaces";
import { APIError } from "../exception/exception";
import { redisClient } from "../config/redis.config";
import { json } from "node:stream/consumers";

export class MenuService {
    menuRepo : MenuRepository
    constructor(){
        this.menuRepo = new MenuRepository
    }

    public getItems = async (menuData : IuserData) => {
        const {id} = menuData
        console.log(id)

        // use the redis to check hit or miss
        const cachedResturatn = await redisClient.get("menu")
        if(cachedResturatn){
            return JSON.parse(cachedResturatn) 
        }
        console.log("menu repo")
        const data  = await this.menuRepo.getMenu(id)
        if(!data){
            throw new APIError("menu not found", 404)
        }
        const {items} = data
        // miss so for the next time we set the data into the cache
        redisClient.set("menu", JSON.stringify(items))

        // delete whenever we wanna
        // redisClient.del("menu")
        return items
    }

    public getItem = async (menuData : IuserData, itemId : number) => {
        const {id} = menuData
        const item = await this.menuRepo.getItem(itemId)
        return item
    }

    public createItem = async (userData : IuserData, menuData : IMenuData) => {
        const {id} = userData
        const menu = await this.menuRepo.createMenu(menuData, +id)
        await redisClient.del("menu")
        return {
            userData,
            menuData
        }
    }
}