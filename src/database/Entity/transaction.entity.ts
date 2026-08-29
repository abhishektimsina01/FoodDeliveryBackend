import {

    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    Unique

} from "typeorm"
import { Order } from "./order.entity"
import { Customer } from "./customer.entity"
import { Resturant } from "./resturant.entity"

@Entity()
@Unique(["payment_id"])
export class Transaction {

    @PrimaryGeneratedColumn({type : "int"})
    transanction_id : number

    @Column({type : "varchar"})
    payment_id : string

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