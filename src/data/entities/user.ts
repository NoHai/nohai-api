import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    city!: string;

    @Column({ name: 'login_with_fb'})
    loginWithFb!: boolean;

    @Column({ name: 'favorite_sport'})
    favoriteSport!: string;

    @Column()
    enabled!: boolean;

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
