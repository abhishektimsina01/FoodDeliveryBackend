"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const order_repos_1 = require("../repositories/order.repos");
const response_utils_1 = require("../utils/response.utils");
const stripe_config_1 = require("../config/stripe.config");
const get_env_utils_1 = require("../utils/get.env.utils");
const orderRepo = new order_repos_1.OrderRepo();
const payment = async (req, res) => {
    const signature = req.headers["stripe-signature"];
    console.log(signature);
    if (!signature) {
        return res.status(400).send("Missing Stripe signature");
    }
    let event;
    try {
        event = stripe_config_1.stripe.webhooks.constructEvent(req.body, signature, (0, get_env_utils_1.getEnvProperty)("stripe_webhook_secret"));
    }
    catch (error) {
        console.error("Webhook signature verification failed");
        return res.status(400).send("Invalid webhook signature");
    }
    console.log("Stripe event:", event.type);
    let response;
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            console.log("Checkout completed");
            console.log("Session ID:", session.id);
            console.log("Payment Intent:", session.payment_intent);
            // Update your database here
            response = await orderRepo.transactionDone(session.id, session.payment_intent);
            break;
        }
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            console.log("Payment succeeded");
            console.log("Payment Intent ID:", paymentIntent.id);
            // Update payment/order here
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            console.log("Payment failed");
            console.log("Payment Intent ID:", paymentIntent.id);
            // Mark payment as failed
            break;
        }
        default:
            console.log(`Unhandled event: ${event.type}`);
    }
    return (0, response_utils_1.SendAPIResponse)(res, 200, "payment done", response);
};
exports.payment = payment;
