import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'street_name' })
    streetName!: string;

    @Column()
    longitude!: number;

    @Column()
    latitude!: number;

    @Column()
    city!: string;

    @Column()
    county!: string;

    constructor(init?: Partial<Address>) {
        super();
        Object.assign(this, init);
    }
}
