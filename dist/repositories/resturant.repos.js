"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResturantRepository = void 0;
const resturant_entity_1 = require("../database/Entity/resturant.entity");
const connect_1 = require("../database/connect");
const project_constants_1 = require("../constants/project.constants");
class ResturantRepository {
    resturantRepo;
    constructor() {
        this.resturantRepo = connect_1.AppDataSource.getRepository(resturant_entity_1.Resturant);
    }
    findResturantDetailed = async (key, value, role) => {
        const resturant = await this.resturantRepo.findOne({
            where: {
                [`${key}`]: value
            },
            select: {
                ...project_constants_1.resturantSelect[role]
            },
            relations: {
                address: true,
                items: true,
                orders: true
            }
        });
        return resturant;
    };
    // signUp garda kheri
    findResturant = async (key, value, IsPassword = false) => {
        const resturant = await this.resturantRepo.findOne({
            where: {
                [`${key}`]: value
            },
            select: {
                resturant_id: true,
                resturant_name: true,
                status: true,
                password: (IsPassword) ? true : false,
                approval_status: true,
                approved_by: true,
                created_at: true
            },
        });
        return resturant;
    };
    findResturants = async (role, filter) => {
        const resturants = await this.resturantRepo.find({
            where: {
                ...filter
            },
            select: {
                ...project_constants_1.allResturantsSelect[role]
            },
            relations: {
                address: true
            }
        });
        return resturants;
    };
    checkResturant = async (id) => {
        const IsResturant = await this.resturantRepo.exists({
            where: {
                resturant_id: id
            }
        });
        return IsResturant;
    };
    createResturant = async (restrodData) => {
        const resturant = this.resturantRepo.create(restrodData);
        return await this.resturantRepo.save(resturant);
    };
    deleteResturants = async () => {
        const resturants = await this.resturantRepo.find();
        await this.resturantRepo.remove(resturants);
        return resturants;
    };
    updateResturant = async (restroData, resturant_id) => {
        await this.resturantRepo.update({
            resturant_id: resturant_id
        }, {
            ...restroData
        });
        const resturant = await this.findResturant("resturant_id", resturant_id);
        return resturant;
    };
    deleteResturant = async (resturant_id) => {
        const resturant = await this.findResturant("resturant_id", resturant_id);
        await this.resturantRepo.remove(resturant);
        return resturant;
    };
}
exports.ResturantRepository = ResturantRepository;
