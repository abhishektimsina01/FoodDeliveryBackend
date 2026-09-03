"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRepository = void 0;
const menu_entity_1 = require("../database/Entity/menu.entity");
const connect_1 = require("../database/connect");
const resturant_entity_1 = require("../database/Entity/resturant.entity");
class MenuRepository {
    menuRepo;
    restroRepo;
    constructor() {
        this.menuRepo = connect_1.AppDataSource.getRepository(menu_entity_1.Menu);
        this.restroRepo = connect_1.AppDataSource.getRepository(resturant_entity_1.Resturant);
    }
    createMenu = async (menuData, resturant_id) => {
        const menu = this.menuRepo.create({
            ...menuData,
            resturant: { resturant_id: resturant_id }
        });
        return await this.menuRepo.save(menu);
    };
    getItem = async (item_id) => {
        const item = await this.menuRepo.findOne({
            where: {
                item_id: item_id
            },
            select: {
                item_id: true,
                item_name: true,
                item_type: true,
                price: true
            }
        });
        return item;
    };
    getMenu = async (resturant_id) => {
        const menu = await this.restroRepo.findOne({
            where: {
                resturant_id: resturant_id
            },
            select: {
                resturant_id: true,
                items: {
                    item_id: true,
                    item_name: true,
                    item_type: true,
                    price: true,
                }
            },
            relations: {
                items: true
            }
        });
        return menu;
    };
    editItem = async () => {
    };
    deleteItem = async () => {
    };
}
exports.MenuRepository = MenuRepository;
