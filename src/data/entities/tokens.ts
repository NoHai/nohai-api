import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from './user';

@Entity('tokens')
export class Tokens extends BaseEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id!: string;

    @Column({ name: 'refresh_token' })
    refreshToken!: string;

    @JoinColumn({ name: 'user_id' })
    @OneToOne(() => User, (user) => user.id)
    user!: User;

    @CreateDateColumn({ name: 'created_date'})
    createdDate!: Date;

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
