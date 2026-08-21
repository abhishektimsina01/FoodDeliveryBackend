import {

    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    CreateDateColumn

} from "typeorm"
import { DeliveryPerson } from "./delivery_person.entity"
import { DELIVERY_STATUS } from "../../enums/enums"
import { Order } from "./order.entity"

@Entity({
    name : "Delivery"
})
export class Delivery{

    @PrimaryGeneratedColumn({type : "bigint"})
    delivery_id : number

    @ManyToOne(() => DeliveryPerson, (person) => person.delivery, {nullable : true})
    @JoinColumn()
    delivery_person : DeliveryPerson

    @Column({type : "enum", enum : DELIVERY_STATUS, default : DELIVERY_STATUS.ORDER_PLACED})
    order_status : DELIVERY_STATUS

    @OneToOne(() => Order, (order) => order.delivery)
    order : Order

    @CreateDateColumn({type : "timestamp without time zone"})
    created_at : Date
}