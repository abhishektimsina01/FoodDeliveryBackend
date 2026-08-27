import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm"
import { ITEM_TYPE } from "../../enums/enums"
import { Resturant } from "./resturant.entity"
import { Order } from "./order.entity"
import { OrderItem } from "./ManyToMany/order_item.entity"

@Entity()
export class Menu { 

    @PrimaryGeneratedColumn({type : "int"})
    item_id : number

    @Column({type : "varchar"})
    item_name : string

    @Column({type : "enum", enum : ITEM_TYPE, default : ITEM_TYPE.FAST_FOOD})
    item_type : ITEM_TYPE

    @Column({type : "bigint", scale : 2})
    price : number

    @ManyToOne(()=> Resturant, (resturant) => resturant.items, {onDelete : "CASCADE"})
    @JoinColumn()
    resturant : Resturant

}