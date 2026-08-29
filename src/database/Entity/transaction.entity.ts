import {

    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne

} from "typeorm"
import { Order } from "./order.entity"
import { Customer } from "./customer.entity"
import { Resturant } from "./resturant.entity"

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn({type : "int"})
    transanction_id : number

    @OneToOne(() => Order, (order) => order.transaction)
    order: Order

    @ManyToOne(() => Customer, (customer) => customer.transaction)
    @JoinColumn()
    customer : Customer

    @ManyToOne(() => Resturant, (resturant) => resturant.transaction)
    @JoinColumn()
    resturant : Resturant

    @Column({type : "int", nullable : true})
    payment : number | null


    // left till the endpoints for this are made.
}