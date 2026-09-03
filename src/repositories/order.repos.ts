import { Repository } from "typeorm";
import { Order } from "../database/Entity/order.entity";
import { OrderItem } from "../database/Entity/ManyToMany/order_item.entity";
import { Menu } from "../database/Entity/menu.entity";
import { AppDataSource } from "../database/connect";
import { IOrderData, ITransaction } from "../interface/interfaces";
import { APIError, DatabaseException } from "../exception/exception";
import { Transaction } from "../database/Entity/transaction.entity";
import { RESTURANT_ORDER_STATUS } from "../enums/enums";
import { IuserData } from "../types/types";

export class OrderRepo {
    orderRepo : Repository<Order>
    orderItemRepo : Repository<OrderItem>
    menuItemRepo : Repository<Menu>
    transactionRepo : Repository<Transaction>

    constructor (){
        this.orderRepo = AppDataSource.getRepository(Order)
        this.orderItemRepo = AppDataSource.getRepository(OrderItem)
        this.menuItemRepo = AppDataSource.getRepository(Menu)
        this.transactionRepo = AppDataSource.getRepository(Transaction)
    }

    public createOrder = async (orderData : IOrderData, customer_id : number) => {
        try{

            const {items} = orderData
            const result = await AppDataSource.transaction( async (manager) => {
            const order = manager.create(Order, {
                resturant : {
                    resturant_id : orderData.resturant_id
                },
                customer : {
                    customer_id : customer_id
                }
            })
            const finalOrder = await manager.save(Order, order)


            const {order_id} = finalOrder
            const itemDta = items.map((item) => {
                return {
                    order : {
                        order_id : order_id
                    },
                    item : {
                        item_id : item.item_id,
                    },
                    quantity : item.quantity
                }
            })
            const order_item = manager.create(OrderItem, itemDta)
            const finalOrderItem = await manager.save(order_item)


            return {finalOrder, finalOrderItem}
        })
        return result
        }
        catch(err){
            throw new DatabaseException("order couldnot be created", 400)
        }
    }

    public getOrder = async () => {

    }

    public deleteOrder = async () => {

    }

    public deleteOrders = async () => {
        const orders = await this.orderRepo.find()
        const order_items = await this.orderItemRepo.find()
        await this.orderRepo.remove(orders)
        // await this.orderItemRepo.remove(order_items)
        return {orders, order_items}
    }

    public getOrders = async (restroData : IuserData) => {
        const orders = await this.orderRepo.find({
            where : {
                resturant : {
                    resturant_id : restroData.id
                }
            },
            select : {
                order_id : true,
                order_item : {
                    link_id : true,
                    item : {
                        item_id : true,
                        item_name : true,
                        item_type : true
                    },
                },
                cost_order : true,
                customer : {
                    customer_id : true,
                    username : true
                },
                status : true,
                transaction : {
                    transanction_id : true
                },
                created_at : true,
            },
            relations : {
                order_item : {
                    item : true,
                },
                transaction : true,
                customer : true,
            }
        })
        return orders
    }

    public sessionAddOrder = async (orderData : number, data : ITransaction) => {
        const {id} = data
        await this.orderRepo.update({
                order_id : orderData
        },{
            session_id : id
        })
        const fetch_order = await this.orderRepo.findOne({
            where : {
                order_id : orderData
            }
        })
        return fetch_order
    }

    public transactionDone = async (session_id : string, payment_id : string) => {
        await this.orderRepo.update({
            session_id : session_id
        },{
            status : RESTURANT_ORDER_STATUS.ORDER_BOOKED
        })
        const order = await this.orderRepo.findOne({
             where : {
                session_id : session_id
             }
        })
        if(!order){
            throw new APIError("order not found", 404)
        }
        const transaction = this.transactionRepo.create({
            payment_id : payment_id,
            customer : order.customer,
            resturant : order.resturant,
        })
        const saved_transaction = await this.transactionRepo.save(transaction)
        return {order, saved_transaction}
    }
}