import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class City extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ name: 'county_id' })
    countyId!: string;

    constructor(init?: Partial<City>) {
        super();
        Object.assign(this, init);
    }
}
