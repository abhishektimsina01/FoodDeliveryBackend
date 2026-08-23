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
import { RESTURANT_IS_APPROVED, RESTURANT_STATUS } from "../../enums/enums"
import { Menu } from "./menu.entity"
import { Order } from "./order.entity"

@Entity()
@Unique(['resturant_name'])
export class Resturant{

    @PrimaryGeneratedColumn({type : "bigint"})
    resturant_id : number

    @Column({type : "varchar"})
    resturant_name : string

    @Column({type : "varchar"})
    owner_name : string

    @Column({type : "enum", enum : RESTURANT_IS_APPROVED, default : RESTURANT_IS_APPROVED.RESTURANT_PENDING})
    approval_status : RESTURANT_IS_APPROVED

    @OneToOne(()=> Address, {onDelete : "CASCADE"})
    @JoinColumn()
    address : Address

    @Column({ type : "enum", enum : [RESTURANT_STATUS.RESTURANT_OPEN, RESTURANT_STATUS.RESTURANT_CLOSE], default : RESTURANT_STATUS.RESTURANT_CLOSE})
    status : RESTURANT_STATUS

    @ManyToOne(()=> Admin, (admin) => admin.resturants, {onDelete : "SET NULL", nullable : true})
    @JoinColumn()
    approved_by : Admin | null

    @OneToMany( ()=> Menu, (menu)=> menu.resturant)
    items : Menu[]

    @OneToMany( () => Order, (order) => order.resturant)
    orders : Order[]

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date

}