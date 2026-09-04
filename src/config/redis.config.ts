import {createClient } from "redis"

const redisClient = createClient({
    url : "http://localhost:6379"
})

redisClient.on("error", (error) => {
    console.log("redist couldnot be connected")
})

export const connectRedis = async () => {
    await redisClient.connect()
    console.log("redis connected")
}