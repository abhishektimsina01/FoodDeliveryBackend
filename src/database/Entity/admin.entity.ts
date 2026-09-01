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

@Entity()
export class Admin{

    @PrimaryGeneratedColumn({type : "int"})
    admin_id : number

    @Column({ type : "varchar"})
    username : number

    @Column({ type : "varchar"})
    password : string

    @Column({ type : "varchar"})
    email : string

    @OneToOne(() => User)
    @JoinColumn()
    user : User

    @OneToMany(()=> Resturant, (resturant)=> resturant.approved_by)
    resturants : Resturant[]

    @CreateDateColumn()
    created_at : Date

}