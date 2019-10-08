import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_events')
export class UserEvents extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'event_id'})
    eventId!: string;

    @Column({ name: 'status'})
    status!: number;

    @Column({ name: 'user_id'})
    userId!: string;

    constructor(init?: Partial<UserEvents>) {
        super();
        Object.assign(this, init);
    }
}
