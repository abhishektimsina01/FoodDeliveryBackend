import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm"
import { Resturant } from "./resturant.entity"
import { User } from "./user.entity"
import { Address } from "./address.entity"

@Entity()
export class Admin{

    @PrimaryGeneratedColumn({type : "int"})
    admin_id !: number

    @Column({ type : "varchar"})
    username !: number

    @Column({ type : "varchar"})
    password !: string

    @Column({ type : "varchar"})
    email !: string

    @OneToOne(() => User)
    @JoinColumn()
    user !: User

    @OneToOne(() => Address)
    @JoinColumn()
    address !: Address

    @OneToMany(()=> Resturant, (resturant)=> resturant.approved_by)
    resturants !: Resturant[]

    @CreateDateColumn()
    created_at !: Date

}