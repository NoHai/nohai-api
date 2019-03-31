import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    dateOfBirth!: Date;

    @Column()
    height!: number;

    @Column()
    weight!: number;

    @Column()
    city!: string;

    @Column()
    picture!: any;

    // TODO : city must be another class or something, and we need to add sports and levels to the user
}
