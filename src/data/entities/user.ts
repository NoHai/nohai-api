import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserDetails } from './user-details';
import { Comment } from '../entities/comment';

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    login!: string;

    @Column()
    password!: string;

    @Column({ name: 'login_with_fb' , nullable: true})
    loginWithFb?: string;

    @Column()
    enabled!: boolean;

    @JoinColumn({ name: 'details_id' })
    @OneToOne(() => UserDetails, (userDetails) => userDetails.id)
    details!: UserDetails;

    @CreateDateColumn({ name: 'created_date' })
    createdDate!: Date;

    @UpdateDateColumn({ name: 'modified_date' })
    modifiedDate!: Date;

    @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
    comments!: Comment[];

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
