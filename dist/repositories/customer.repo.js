"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const connect_1 = require("../database/connect");
const customer_entity_1 = require("../database/Entity/customer.entity");
class CustomerRepository {
    customerRepo;
    constructor() {
        this.customerRepo = connect_1.AppDataSource.getRepository(customer_entity_1.Customer);
    }
    findCustomer = async (key, value, IsPassword = false) => {
        if (key == "email" || key == "customer_id") {
            const userData = await this.customerRepo.findOne({
                where: {
                    [`${key}`]: value
                },
                select: {
                    customer_id: true,
                    username: true,
                    email: true,
                    password: IsPassword ? true : false,
                    created_at: true,
                    address: {
                        city: true,
                        phone_number1: true,
                        street_name: true
                    }
                },
                relations: {
                    address: true
                }
            });
            return userData;
        }
    };
    checkCustomer = async (key, value) => {
        const IsUser = await this.customerRepo.exists({
            where: {
                [`${key}`]: value
            }
        });
        return IsUser;
    };
    createCustomer = async (userData) => {
        try {
            const user = this.customerRepo.create(userData);
            const saved_user = await this.customerRepo.save(user);
            return saved_user;
        }
        catch (err) {
            throw err;
        }
    };
    deleteCustomer = async () => {
        const users = await this.customerRepo.find();
        await this.customerRepo.remove(users);
        return users;
    };
}
exports.CustomerRepository = CustomerRepository;
