import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    ManyToMany,
    Or,
} from "typeorm"
import { ITEM_TYPE } from "../../enums/enums"
import { Resturant } from "./resturant.entity"
import { Order } from "./order.entity"

@Entity({
    name : "Menu"
})
export class Menu { 

    @PrimaryGeneratedColumn({type : "bigint"})
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