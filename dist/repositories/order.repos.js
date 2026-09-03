"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepo = void 0;
const order_entity_1 = require("../database/Entity/order.entity");
const order_item_entity_1 = require("../database/Entity/ManyToMany/order_item.entity");
const menu_entity_1 = require("../database/Entity/menu.entity");
const connect_1 = require("../database/connect");
const exception_1 = require("../exception/exception");
const transaction_entity_1 = require("../database/Entity/transaction.entity");
const enums_1 = require("../enums/enums");
class OrderRepo {
    orderRepo;
    orderItemRepo;
    menuItemRepo;
    transactionRepo;
    constructor() {
        this.orderRepo = connect_1.AppDataSource.getRepository(order_entity_1.Order);
        this.orderItemRepo = connect_1.AppDataSource.getRepository(order_item_entity_1.OrderItem);
        this.menuItemRepo = connect_1.AppDataSource.getRepository(menu_entity_1.Menu);
        this.transactionRepo = connect_1.AppDataSource.getRepository(transaction_entity_1.Transaction);
    }
    createOrder = async (orderData, customer_id) => {
        try {
            const { items } = orderData;
            const result = await connect_1.AppDataSource.transaction(async (manager) => {
                const order = manager.create(order_entity_1.Order, {
                    resturant: {
                        resturant_id: orderData.resturant_id
                    },
                    customer: {
                        customer_id: customer_id
                    }
                });
                const finalOrder = await manager.save(order_entity_1.Order, order);
                const { order_id } = finalOrder;
                const itemDta = items.map((item) => {
                    return {
                        order: {
                            order_id: order_id
                        },
                        item: {
                            item_id: item.item_id,
                        },
                        quantity: item.quantity
                    };
                });
                const order_item = manager.create(order_item_entity_1.OrderItem, itemDta);
                const finalOrderItem = await manager.save(order_item);
                return { finalOrder, finalOrderItem };
            });
            return result;
        }
        catch (err) {
            throw new exception_1.DatabaseException("order couldnot be created", 400);
        }
    };
    getOrder = async () => {
    };
    deleteOrder = async () => {
    };
    deleteOrders = async () => {
        const orders = await this.orderRepo.find();
        const order_items = await this.orderItemRepo.find();
        await this.orderRepo.remove(orders);
        // await this.orderItemRepo.remove(order_items)
        return { orders, order_items };
    };
    getOrders = async (restroData) => {
        const orders = await this.orderRepo.find({
            where: {
                resturant: {
                    resturant_id: restroData.id
                }
            },
            select: {
                order_id: true,
                order_item: {
                    link_id: true,
                    item: {
                        item_id: true,
                        item_name: true,
                        item_type: true
                    },
                },
                cost_order: true,
                customer: {
                    customer_id: true,
                    username: true
                },
                status: true,
                transaction: {
                    transanction_id: true
                },
                created_at: true,
            },
            relations: {
                order_item: {
                    item: true,
                },
                transaction: true,
                customer: true,
            }
        });
        return orders;
    };
    sessionAddOrder = async (orderData, data) => {
        const { id } = data;
        await this.orderRepo.update({
            order_id: orderData
        }, {
            session_id: id
        });
        const fetch_order = await this.orderRepo.findOne({
            where: {
                order_id: orderData
            }
        });
        return fetch_order;
    };
    transactionDone = async (session_id, payment_id) => {
        await this.orderRepo.update({
            session_id: session_id
        }, {
            status: enums_1.RESTURANT_ORDER_STATUS.ORDER_BOOKED
        });
        const order = await this.orderRepo.findOne({
            where: {
                session_id: session_id
            }
        });
        if (!order) {
            throw new exception_1.APIError("order not found", 404);
        }
        const transaction = this.transactionRepo.create({
            payment_id: payment_id,
            customer: order.customer,
            resturant: order.resturant,
        });
        const saved_transaction = await this.transactionRepo.save(transaction);
        return { order, saved_transaction };
    };
}
exports.OrderRepo = OrderRepo;
