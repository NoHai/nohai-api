import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address';
import { Sport } from './sport';
import { User } from './user';

@Entity('event')
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @JoinColumn({ name: 'address_id' })
    @OneToOne(() => Address, (address) => address.id, { cascade: true })
    address!: Address;

    @JoinColumn({ name: 'sport_id'})
    @OneToOne(() => Sport, (sport) => sport.id, { cascade: true})
    sport!: Sport;

    @Column({ name: 'free_spots' })
    freeSpots!: number;

    @Column()
    cost!: number;

    @Column()
    date!: string;

    @Column()
    hour!: string;

    @OneToOne(() => User, (user) => user.id, { cascade: false, eager: true })
    @JoinColumn({ name: 'owner'})
    owner!: User;

    @Column()
    duration!: number;

    @Column()
    level!: number;

    constructor(init?: Partial<Event>) {
        super();
        Object.assign(this, init);
    }
}
