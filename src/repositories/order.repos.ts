import { Repository } from "typeorm";
import { Order } from "../database/Entity/order.entity";
import { OrderItem } from "../database/Entity/ManyToMany/order_item.entity";
import { Menu } from "../database/Entity/menu.entity";
import { AppDataSource } from "../database/connect";
import { IOrderData } from "../interface/interfaces";
import { DatabaseException } from "../exception/exception";

export class OrderRepo {
    orderRepo : Repository<Order>
    orderItemRepo : Repository<OrderItem>
    menuItemRepo : Repository<Menu>

    constructor (){
        this.orderRepo = AppDataSource.getRepository(Order)
        this.orderItemRepo = AppDataSource.getRepository(OrderItem)
        this.menuItemRepo = AppDataSource.getRepository(Menu)
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
                    order_id : order_id,
                    item_id : item.item_id,
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

    public getOrders = async () => {

    }
}