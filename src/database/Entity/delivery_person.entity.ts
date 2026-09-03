import {

    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    JoinColumn,

} from "typeorm"
import { Address } from "./address.entity"
import { Delivery } from "./delivery.entity"

@Entity()
export class DeliveryPerson{

    @PrimaryGeneratedColumn({type : "int"})
    delivery_person_id !: number

    @Column({type : "bigint"})
    name !: string

    @OneToOne(() => Address)
    @JoinColumn()
    address !: Address

    @OneToMany(() => Delivery, (delivery) => delivery.delivery_person)
    delivery !: Delivery[]

}