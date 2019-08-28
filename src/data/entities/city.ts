import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class City extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    constructor(init?: Partial<City>) {
        super();
        Object.assign(this, init);
    }
}
