import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city';

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    login!: string;

    @Column()
    password!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ name: 'date_of_birth' })
    dateOfBirth!: Date;

    @Column()
    height!: number;

    @Column()
    weight!: number;

    @Column()
    picture!: string;

    @OneToOne(() => City)
    @JoinColumn()
    city!: City;

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
