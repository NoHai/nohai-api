import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city';
import { County } from './county';

@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    streetName!: string;

    @OneToOne(() => City, (city) => city.id)
    @JoinColumn()
    city!: City;

    @OneToOne(() => County, (county) => county.id)
    @JoinColumn()
    county!: County;

    constructor(init?: Partial<Address>) {
        super();
        Object.assign(this, init);
    }
}
