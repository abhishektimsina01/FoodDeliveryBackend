import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn({type : "int"})
    user_id : number

    @Column({type : "varchar"})
    username : string

    @Column({ type : "varchar"})
    password : string

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date

    @DeleteDateColumn({ nullable : true})
    deleted_at : Date | null

    @OneToOne(() => Address)
    @JoinColumn()
    address : Address
}