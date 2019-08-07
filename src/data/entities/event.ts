import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address';

@Entity('event')
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @JoinColumn({ name: 'address_id' })
    @OneToOne(() => Address, (address) => address.id)
    address!: Address;

    @Column()
    sport!: string;

    @Column({ name: 'free_spots' })
    freeSpots!: number;

    @Column()
    cost!: number;

    @Column()
    date!: string;

    @Column()
    hour!: string;

    @Column()
    owner!: string;

    @Column()
    duration!: number;

    @Column()
    level!: number;

    constructor(init?: Partial<Event>) {
        super();
        Object.assign(this, init);
    }
}
