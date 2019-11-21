import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_details')
export class UserDetails extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'user_id' })
    userId!: string;

    @Column({ name: 'first_name' })
    firstName!: string;

    @Column({ name: 'last_name' })
    lastName!: string;

    @Column()
    city!: string;

    @Column()
    picture!: string;

    @Column({ name: 'date_of_birth' })
    dateOfBirth!: Date;

    @Column({ name: 'job_title' })
    jobTitle!: string;

    @Column({ name: 'web_page' })
    webPage!: string;

    @Column({ name: 'facebook_page' })
    facebookPage!: string;

    @Column()
    description!: string;

    constructor(init?: Partial<UserDetails>) {
        super();
        Object.assign(this, init);
    }
}
