import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
