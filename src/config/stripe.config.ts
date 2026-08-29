import Stripe from "stripe"
import { getEnvProperty } from "../utils/get.env.utils"

export const stripe = new Stripe(
    getEnvProperty("stripe_secret_key")
)