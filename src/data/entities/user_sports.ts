import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Sport } from './sport';
import { User } from './user';

@Entity('user_sports')
export class UserSports extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @JoinColumn({ name: 'sport_id' })
    @OneToOne(() => Sport, (sport) => sport.id, { cascade: false })
    sport!: Sport;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.details.favoriteSports)
    user!: User;

    @CreateDateColumn({ name: 'created_date' })
    createdDate!: Date;

    constructor(init?: Partial<UserSports>) {
        super();
        Object.assign(this, init);
    }
}
