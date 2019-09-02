import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user';

@Entity('notification_token')
export class NotificationToken extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @JoinColumn({ name: 'user_id'})
    @OneToOne(() => User, (user) => user.id, { cascade: true})
    userId!: string;

    @Column()
    token!: string;

    constructor(init?: Partial<NotificationToken>) {
        super();
        Object.assign(this, init);
    }
}
