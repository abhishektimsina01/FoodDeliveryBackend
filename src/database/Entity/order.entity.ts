import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne

} from "typeorm"
import { RESTURANT_ORDER_STATUS } from "../../enums/enums"
import { Resturant } from "./resturant.entity"
import { OrderItem } from "./ManyToMany/order_item.entity"
import { Delivery } from "./delivery.entity"
import { Transaction } from "./transaction.entity"

@Entity()
export class Order {

    @PrimaryGeneratedColumn({type : "int"})
    order_id : number

    @Column({type : "enum", enum : RESTURANT_ORDER_STATUS, default : RESTURANT_ORDER_STATUS.ORDER_PENDING})
    status : RESTURANT_ORDER_STATUS

    @ManyToOne(() => Resturant, (resturant) => resturant.orders, {onDelete : "RESTRICT"})
    @JoinColumn()
    resturant : Resturant

    @OneToMany(() => OrderItem, (order_item) => order_item.order)
    order_item : OrderItem[]

    @OneToOne(() => Delivery, (delivery) => delivery.order, {nullable : true})
    @JoinColumn()
    delivery : Delivery

    @Column({type : "bigint", scale : 2})
    cost_order : number
    
    @Column({ type : "bigint", scale : 2})
    delivery_price : number

    @OneToOne(() => Transaction, (trans) => trans.order, {nullable : true})
    @JoinColumn()
    transaction : Transaction
    
    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date

    @Column({type : "timestamp"})
    deadline : Date
}