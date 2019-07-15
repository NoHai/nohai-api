import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city';
import { County } from './county';

@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'street_name' })
    streetName!: string;

    @JoinColumn({ name: 'city_id' })
    @OneToOne(() => City, (city) => city.id)
    city!: City;

    @JoinColumn({ name: 'county_id' })
    @OneToOne(() => County, (county) => county.id)
    county!: County;

    constructor(init?: Partial<Address>) {
        super();
        Object.assign(this, init);
    }
}
