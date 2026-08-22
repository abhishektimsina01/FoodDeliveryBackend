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


@Entity({
    name : "Customers"
})
@Unique(["email"])
export class Customer {

    @PrimaryGeneratedColumn({ type : "bigint"})
    customer_id : number

    @Column({ type : "varchar"})
    username : string

    @Column({ type : "varchar", select : false})
    password : string

    @Column({type : "varchar"})
    email : string

    @OneToOne(() => Address, {onDelete : "CASCADE"})
    @JoinColumn()
    address : Address

    @CreateDateColumn({type : "timestamp without time zone"})
    created_at : Date

    @UpdateDateColumn({type : "timestamp without time zone"})
    updated_at : Date

}