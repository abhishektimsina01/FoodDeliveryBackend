import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm"
import { Menu } from "../menu.entity"
import { Order } from "../order.entity"

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn({type : "int"})
    link_id : number

    @ManyToOne(() => Menu)
    @JoinColumn()
    item : Menu

    @ManyToOne(() => Order, (order) => order.order_item, {onDelete : "CASCADE"})
    @JoinColumn()
    order : Order

    @Column({ type : 'int', default : 1})
    quantity : number

}