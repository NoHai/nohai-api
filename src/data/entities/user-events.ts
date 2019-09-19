import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('user_events')
export class UserEvents extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // @Column({ name: 'user_id'})
    // userId!: string;

    @Column({ name: 'event_id'})
    eventId!: string;

    @Column({ name: 'status'})
    status!: number;

    @OneToOne(() => User, (user) => user.id, { cascade: false, eager: true })
    @JoinColumn({ name: 'user_id'})
    user!: User;

    constructor(init?: Partial<UserEvents>) {
        super();
        Object.assign(this, init);
    }
}
