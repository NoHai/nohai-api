import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;
}
