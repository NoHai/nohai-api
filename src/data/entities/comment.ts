import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Event } from './event';


@Entity('comment')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @JoinColumn({ name: 'author_id' })
    @ManyToOne(() => User, (user) => user.comments, { eager : true})
    user!: User;

    @JoinColumn({ name: 'event_id'})
    @ManyToOne(() => Event, (event) => event.comments)
    event!: Event;

    @Column()
    description!: string;

    @Column()
    date!: Date;

    @Column()
    isDeleted!: boolean;

    constructor(init?: Partial<Comment>) {
        super();
        Object.assign(this, init);
    }
}
