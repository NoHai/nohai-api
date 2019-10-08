import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity('tokens')
export class Tokens extends BaseEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id!: string;

    @Column({ name: 'access_token' })
    accessToken!: string;

    @Column({ name: 'refresh_token' })
    refreshToken!: string;

    @JoinColumn({ name: 'user_id' })
    @OneToOne(() => User, (user) => user.id)
    user!: User;

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
