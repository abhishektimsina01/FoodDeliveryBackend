import express, { Request, response, Response } from "express";
import Stripe from "stripe";
import { OrderRepo } from "../repositories/order.repos";
import { SendAPIResponse } from "../utils/response.utils";
import { stripe } from "../config/stripe.config";
import { getEnvProperty } from "../utils/get.env.utils";

const orderRepo = new OrderRepo()

 const payment = async(req: Request, res: Response) => {
        const signature = req.headers["stripe-signature"];
        console.log(signature)
        if (!signature) {
            return res.status(400).send("Missing Stripe signature");
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                getEnvProperty("stripe_webhook_secret")!
            );
        } catch (error) {
            console.error("Webhook signature verification failed");
            return res.status(400).send("Invalid webhook signature");
        }
        console.log("Stripe event:", event.type);
        let response : any
        switch (event.type) {

            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                console.log("Checkout completed");
                console.log("Session ID:", session.id);
                console.log("Payment Intent:", session.payment_intent);

                // Update your database here
                response = await orderRepo.transactionDone(session.id, session.payment_intent as string)
                break;
            }

            case "payment_intent.succeeded": {
                const paymentIntent =
                    event.data.object as Stripe.PaymentIntent;

                console.log("Payment succeeded");
                console.log("Payment Intent ID:", paymentIntent.id);

                // Update payment/order here

                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent =
                    event.data.object as Stripe.PaymentIntent;

                console.log("Payment failed");
                console.log("Payment Intent ID:", paymentIntent.id);

                // Mark payment as failed

                break;
            }

            default:
                console.log(`Unhandled event: ${event.type}`);
        }

        return SendAPIResponse(res, 200, "payment done", response)
    }


export {payment} 