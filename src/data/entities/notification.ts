import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class Notification extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ name: 'event_id'})
    eventId!: string;

    @Column()
    body!: string;

    @Column({ name: 'notification_type', default: 1})
    notificationType!: number;

    @Column({ name: 'avatar_url'})
    avatarUrl!: string;

    @Column({ name: 'created_date'})
    createdDate!: Date;

    @Column({ name: 'created_user'})
    createdUser!: string;

    @Column({ name: 'user_id'})
    user!: string;

    @Column()
    status!: number;

    constructor(init?: Partial<Notification>) {
        super();
        Object.assign(this, init);
    }
}
