import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import { Address } from "./address.entity"
import { Order } from "./order.entity"
import { Transaction } from "./transaction.entity"


@Entity()
@Unique(["email"])
export class Customer {

    @PrimaryGeneratedColumn({ type : "int"})
    customer_id !: number

    @Column({ type : "varchar"})
    username !: string

    @Column({ type : "varchar"})
    password !: string

    @Column({type : "varchar"})
    email !: string

    @OneToMany(() => Order, (order) => order.customer)
    orders !: Order[]

    @OneToMany(() => Transaction, (trans) => trans.customer)
    transaction !: Transaction[]

    @OneToOne(() => Address)
    @JoinColumn()
    address !: Address

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date

}