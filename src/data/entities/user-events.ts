import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user';
import { Event } from './event';

@Entity('user_events')
export class UserEvents extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // @JoinColumn({ name: 'user_id'})
    // userId!: string;

    @JoinColumn({ name: 'user_id'})
    @OneToOne(() => User, (user) => user.id, { cascade: true })
    user!: User;

    @JoinColumn({ name: 'event_id'})
    @OneToOne(() => Event, (event) => event.id, { cascade: true })
    event!: Event;

    @Column({ name: 'status'})
    status!: number;

    constructor(init?: Partial<UserEvents>) {
        super();
        Object.assign(this, init);
    }
}
