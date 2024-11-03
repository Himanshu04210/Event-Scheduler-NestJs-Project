import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'CREATED_DATE'})
    createdDate: Date;

    @Column({name: 'MODIFIED_DATE'})
    modifiedDate: Date;

    @Column({name: 'FULL_NAME'})
    name: string;

    @Column({name: 'EMAIL', nullable: false, unique: true})
    email: string;

    @Column({name: 'PASSWORD'})
    password: string;

    @Column({name: 'ROLE'})
    role: string;
}
