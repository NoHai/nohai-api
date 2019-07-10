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
    picture!: any;

    @Column()
    cityId!: number;

    constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
    }
}
