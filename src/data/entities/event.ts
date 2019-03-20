import { BaseEntity, Entity, ObjectIdColumn } from 'typeorm';

@Entity('events')
export class Event extends BaseEntity {

    @ObjectIdColumn()
    id!: string;

    title!: string;

    constructor(init?: Partial<Event>) {
        super();
        Object.assign(this, init);
    }
}
