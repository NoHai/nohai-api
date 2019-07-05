import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event')
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    location!: string;

    @Column()
    sport!: string;

    @Column()
    participantsNumber!: number;

    @Column()
    cost!: number;

    constructor(init?: Partial<Event>) {
        super();
        Object.assign(this, init);
    }
}
