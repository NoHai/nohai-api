import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sport')
export class Sport extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    defaultParticipantsNumber!: number;
}
