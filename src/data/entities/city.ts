import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class City extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    stateId!: number;
}
