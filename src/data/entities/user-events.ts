import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_events')
export class UserEvents extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'user_id'})
    userId!: string;

    @Column({ name: 'event_id'})
    eventId!: string;

    @Column({ name: 'status'})
    status!: number;

    constructor(init?: Partial<UserEvents>) {
        super();
        Object.assign(this, init);
    }
}
