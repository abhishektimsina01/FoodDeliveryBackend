import { Repository } from "typeorm";
import { Menu } from "../database/Entity/menu.entity";
import { AppDataSource } from "../database/connect";
import { Resturant } from "../database/Entity/resturant.entity";
import { it } from "node:test";
import { IMenuData } from "../interface/interfaces";

export class MenuRepository {
    menuRepo : Repository<Menu>
    restroRepo : Repository<Resturant>

    constructor(){
        this.menuRepo = AppDataSource.getRepository(Menu)
        this.restroRepo = AppDataSource.getRepository(Resturant)
    }

    public createMenu = async (menuData : IMenuData, resturant_id : number) => {
        const menu = this.menuRepo.create({
            ...menuData,
            resturant : {resturant_id : resturant_id}
        })
        return await this.menuRepo.save(menu)
    }

    public getItem = async (item_id : number) => {
        const item = await this.menuRepo.findOne({
            where : {
                item_id : item_id
            },
            select : {
                item_id : true,
                item_name : true,
                item_type : true,
                price : true
            }
        })
        return item
    }
    
    public getMenu = async (resturant_id : number) => {
        const menu = await this.restroRepo.findOne({
            where : {
                resturant_id : resturant_id
            },
            select : {  
                resturant_id : true,
                items : {
                    item_id : true,
                    item_name : true,
                    item_type : true,
                    price : true,
                }
            },
            relations : {
                items : true
            }
        })
        return menu
    }

    public editItem = async () => {

    }

    public deleteItem = async () => {

    }
}