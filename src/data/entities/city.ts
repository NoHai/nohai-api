import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { County } from './county';

@Entity('city')
export class City extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @OneToOne(() => County, (county) => county.id)
    @JoinColumn()
    county!: County;

    constructor(init?: Partial<City>) {
        super();
        Object.assign(this, init);
    }
}
