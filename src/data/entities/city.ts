import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { County } from './county';

@Entity('city')
export class City extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @JoinColumn({ name: 'county_id' })
    @OneToOne(() => County, (county) => county.id)
    county!: County;

    constructor(init?: Partial<City>) {
        super();
        Object.assign(this, init);
    }
}
