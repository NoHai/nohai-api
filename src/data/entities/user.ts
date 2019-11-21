import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Sport } from './sport';
import { UserDetails } from '../../business/models/results/user-details';

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    login!: string;

    @Column()
    password!: string;

    @Column({ name: 'login_with_fb' })
    loginWithFb!: boolean;

    @Column()
    enabled!: boolean;

    @JoinColumn({ name: 'details_id' })
    @OneToOne(() => UserDetails, (details) => details.id, { cascade: true })
    details!: UserDetails;

    favoriteSports!: Sport[];

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
