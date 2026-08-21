import {

    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable

} from "typeorm"
import { RESTURANT_ORDER_STATUS } from "../../enums/enums"
import { Resturant } from "./resturant.entity"
import { Menu } from "./menu.entity"

@Entity({
    name : "Order"
})
export class Order {

    @PrimaryGeneratedColumn({type : "bigint"})
    order_id : number

    @Column({type : "enum", enum : RESTURANT_ORDER_STATUS, default : RESTURANT_ORDER_STATUS.ORDER_PENDING})
    status : RESTURANT_ORDER_STATUS

    @ManyToOne(() => Resturant, (resturant) => resturant.orders, {onDelete : "RESTRICT"})
    @JoinColumn()
    resturant : Resturant

    @ManyToMany(()=> Menu, (menu) => menu.orders, {onDelete : "CASCADE"})
    @JoinTable({
        name : "order_item",
        joinColumn : {
            name : "order_id",
            referencedColumnName : "order_id"
        },
        inverseJoinColumn : {
            name : "item_id",
            referencedColumnName : "item_name"
        }
    })
    items : Menu[]

}