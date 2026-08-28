import { OrderRepo } from "../repositories/order.repos";
import { IuserData } from "../types/types";
import { IOrderData } from "../interface/interfaces";


export class OrderService {
    orderRepo : OrderRepo
    constructor(){
        this.orderRepo = new OrderRepo()
    }
    
    public createOrder = async (userData : IuserData, orderData : IOrderData) => {
        const {id} = userData
        const order = await this.orderRepo.createOrder(orderData, id)
        return order
    }
}