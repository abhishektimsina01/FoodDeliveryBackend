"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_repos_1 = require("../repositories/order.repos");
const stripe_config_1 = require("../config/stripe.config");
class OrderService {
    orderRepo;
    constructor() {
        this.orderRepo = new order_repos_1.OrderRepo();
    }
    createOrder = async (userData, orderData) => {
        try {
            const { id } = userData;
            const { finalOrder, finalOrderItem } = await this.orderRepo.createOrder(orderData, id);
            const { order_id } = finalOrder;
            const session = await stripe_config_1.stripe.checkout.sessions.create({
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "order"
                            },
                            unit_amount: 5000
                        },
                        quantity: 1
                    }
                ],
                success_url: "https://pills-buffer-operate-algorithm.trycloudflare.com/api/v1/webhook/success",
                cancel_url: "https://pills-buffer-operate-algorithm.trycloudflare.com/api/v1/webhook/failure"
            });
            console.log(session.id);
            const transaction = await this.orderRepo.sessionAddOrder(order_id, session);
            console.log(transaction);
            return {
                "checkout_url": session.url
            };
        }
        catch (err) {
            throw err;
        }
    };
    getOrders = async (userData) => {
        const orders = await this.orderRepo.getOrders(userData);
        return orders;
    };
    deleteOrders = async () => {
        const orders = await this.orderRepo.deleteOrders();
        return orders;
    };
}
exports.OrderService = OrderService;
