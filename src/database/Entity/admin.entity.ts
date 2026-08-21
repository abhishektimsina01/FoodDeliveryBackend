import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm"
import { Resturant } from "./resturant.entity"

@Entity()
export class Admin{

    @PrimaryGeneratedColumn({type : "bigint"})
    admin_id : number

    @Column({ type : "varchar"})
    username : number

    @Column({ type : "varchar"})
    password : string

    @Column({ type : "varchar"})
    email : string

    @OneToMany(()=> Resturant, (resturant)=> resturant.approved_by)
    resturants : Resturant[]

    @CreateDateColumn()
    created_at : Date

}