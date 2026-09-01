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
import { User } from "./user.entity"

@Entity()
export class DeliveryPerson{

    @PrimaryGeneratedColumn({type : "int"})
    delivery_person_id : number

    @Column({type : "bigint"})
    name : string

    @OneToOne(() => User)
    @JoinColumn()
    user : User

    @OneToMany(() => Delivery, (delivery) => delivery.delivery_person)
    delivery : Delivery[]

}