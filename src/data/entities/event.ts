import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    constructor(init?: Partial<Event>) {
        super();
        Object.assign(this, init);
    }
}
