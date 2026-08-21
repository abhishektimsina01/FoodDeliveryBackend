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
import { Admin } from "./admin.entity"
import { RESTURANT_STATUS } from "../../enums/enums"
import { Menu } from "./menu.entity"
import { Order } from "./order.entity"

@Entity({
    name : "Resturants"
})
@Unique(['resturant_name'])
export class Resturant{

    @PrimaryGeneratedColumn({type : "bigint"})
    resturant_id : number

    @Column({type : "varchar"})
    resturant_name : string

    @Column({type : "varchar"})
    owner_name : string

    @OneToOne(()=> Address, (address) => address.entity)
    address : Address

    @Column({ type : "enum", enum : [RESTURANT_STATUS.RESTURANT_OPEN, RESTURANT_STATUS.RESTURANT_OPEN], default : RESTURANT_STATUS.RESTURANT_CLOSE})
    status : RESTURANT_STATUS

    @ManyToOne(()=> Admin, (admin) => admin.resturants, {onDelete : "SET NULL", nullable : true})
    @JoinColumn()
    approved_by : Admin | null

    @OneToMany( ()=> Menu, (menu)=> menu.resturant)
    items : Menu[]

    @OneToMany( () => Order, (order) => order.resturant)
    orders : Order[]

    @CreateDateColumn({type : "timestamp without time zone"})
    created_at : Date

    @UpdateDateColumn({type : "timestamp without time zone"})
    updated_at : Date

}