import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Sport } from './sport';

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

    @OneToOne(() => Sport, (sport) => sport.id, { cascade: false, eager: true })
    @JoinColumn({ name: 'favorite_sport'})
    favoriteSport!: Sport;

    @Column()
    enabled!: boolean;

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
