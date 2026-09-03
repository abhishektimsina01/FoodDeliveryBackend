"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const menu_repos_1 = require("../repositories/menu.repos");
const exception_1 = require("../exception/exception");
class MenuService {
    menuRepo;
    constructor() {
        this.menuRepo = new menu_repos_1.MenuRepository;
    }
    getItems = async (menuData) => {
        const { id } = menuData;
        console.log(id);
        const data = await this.menuRepo.getMenu(id);
        if (!data) {
            throw new exception_1.APIError("menu not found", 404);
        }
        const { items } = data;
        return items;
    };
    getItem = async (menuData, itemId) => {
        const { id } = menuData;
        const item = await this.menuRepo.getItem(itemId);
        return item;
    };
    createItem = async (userData, menuData) => {
        const { id } = userData;
        const menu = await this.menuRepo.createMenu(menuData, +id);
        return {
            userData,
            menuData
        };
    };
}
exports.MenuService = MenuService;
