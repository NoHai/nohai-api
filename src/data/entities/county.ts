import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('county')
export class County extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    constructor(init?: Partial<County>) {
        super();
        Object.assign(this, init);
    }
}
