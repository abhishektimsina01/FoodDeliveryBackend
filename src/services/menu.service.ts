import { it } from "node:test";
import { MenuRepository } from "../repositories/menu.repos";
import { IuserData } from "../types/types";
import { IMenuData } from "../interface/interfaces";
import { APIError } from "../exception/exception";

export class MenuService {
    menuRepo : MenuRepository
    constructor(){
        this.menuRepo = new MenuRepository
    }

    public getItems = async (menuData : IuserData) => {
        const {id} = menuData
        console.log(id)
        const data  = await this.menuRepo.getMenu(id)
        if(!data){
            throw new APIError("menu not found", 404)
        }
        const {items} = data
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
        return {
            userData,
            menuData
        }
    }
}