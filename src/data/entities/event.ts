import {BaseEntity, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({database: 'test'})
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;
}
