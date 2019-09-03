import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity('notification_token')
export class NotificationToken extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'user_id'})
    userId!: string;

    @Column()
    token!: string;

    constructor(init?: Partial<NotificationToken>) {
        super();
        Object.assign(this, init);
    }
}
