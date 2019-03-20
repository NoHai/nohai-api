import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    constructor(init?: Partial<Event>) {
        super();
        Object.assign(this, init);
    }
}
