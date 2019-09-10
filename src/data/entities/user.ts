import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city';

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    login!: string;

    @Column()
    password!: string;

    @Column({ name: 'first_name' })
    firstName!: string;

    @Column({ name: 'last_name' })
    lastName!: string;

    @Column({ name: 'date_of_birth' })
    dateOfBirth!: string;

    @Column()
    height!: number;

    @Column()
    weight!: number;

    @Column()
    picture!: string;

    @OneToOne(() => City)
    @JoinColumn({ name: 'city_id' })
    city!: City;

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
