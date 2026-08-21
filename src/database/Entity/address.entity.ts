import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Unique,
} from "typeorm"
import { Customer } from "./customer.entity"

@Entity({
    name : "Addresses"
})
@Unique(["phone_number1"])
export class Address{

    @PrimaryGeneratedColumn({ type : "int"})
    address_id : number

    @Column({type : "varchar"})
    street_name : string

    @Column({type : "int"})
    ward_num : string

    @Column({type : "varchar"})
    city : string

    @Column({type : "int", default : "977"})
    country_id : number

    @Column({ type : "bigint", precision : 10, nullable : false, unsigned : true})
    phone_number1 : number

    @OneToOne(() => Customer, (customer) => customer.address, {onDelete : "CASCADE"})
    @JoinColumn()
    entity : Customer

}