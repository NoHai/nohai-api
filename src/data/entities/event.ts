import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
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

    @Column({ name: 'start_date'})
    startDate!: Date;

    @Column({ name: 'end_date'})
    endDate!: Date;

    @Column({ name: 'start_time'})
    startTime!: string;

    @Column({ name: 'end_time'})
    endTime!: string;

    @OneToOne(() => User, (user) => user.id, { cascade: false, eager: true })
    @JoinColumn({ name: 'owner'})
    owner!: User;

    @Column()
    level!: number;

    @CreateDateColumn({ name: 'created_date'})
    createdDate!: Date;

    constructor(init?: Partial<Event>) {
        super();
        Object.assign(this, init);
    }
}
