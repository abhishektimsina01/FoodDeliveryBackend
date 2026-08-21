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
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute.js"

@Entity({
    name : "delivery"
})
export class DeliveryPerson{

    @PrimaryGeneratedColumn({type : "bigint"})
    delivery_person_id : number

    @Column({type : "bigint"})
    name : string

    @OneToOne(() => Address)
    @JoinColumn()
    address : Address

    @OneToMany(() => Delivery, (delivery) => delivery.delivery_person)
    delivery : Delivery[]

}