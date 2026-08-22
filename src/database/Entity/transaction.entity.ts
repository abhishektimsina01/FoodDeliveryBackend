import {

    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn

} from "typeorm"
import { Order } from "./order.entity"

@Entity({
    name : "Transaction"
})
export class Transaction {

    @PrimaryGeneratedColumn({type : "bigint"})
    transanction_id : number

    @OneToOne(() => Order, (order) => order.transaction)
    order: Order

    // left till the endpoints for this are made.

}