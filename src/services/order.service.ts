import { OrderRepo } from "../repositories/order.repos";
import { IuserData } from "../types/types";
import { IOrderData, ITransaction } from "../interface/interfaces";
import {stripe} from  "../config/stripe.config"


export class OrderService {
    orderRepo : OrderRepo
    constructor(){
        this.orderRepo = new OrderRepo()
    }

    public createOrder = async (userData : IuserData, orderData : IOrderData) => {
        try{
            const {id} = userData
            const {finalOrder, finalOrderItem} = await this.orderRepo.createOrder(orderData, id)
            const {order_id} = finalOrder
            const session = await stripe.checkout.sessions.create({
                mode : 'payment',
                line_items : [
                    {
                        price_data : {
                            currency : "usd",
                            product_data : {
                                name : "order"
                            },
                            unit_amount : 5000
                        },
                        quantity : 1
                    }
                ],
                success_url : "http://localhost:8010/api/v1/webhook/success",
                cancel_url : "http://localhost:8010/api/v1/webhook/failure"
            })
            console.log(session.id)
            const transaction = await this.orderRepo.sessionAddOrder(order_id, session as ITransaction)
            console.log(transaction)
            return {
                "checkout_url" : session.url
            }
        }
        catch(err){
            throw err
        }
    }

    public deleteOrders = async () => {
        const orders = await this.orderRepo.deleteOrders()
        return orders
    }
}