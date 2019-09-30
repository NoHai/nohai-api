import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sport')
export class Sport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ name: 'default_participants_number' })
  defaultParticipantsNumber!: number;

  @Column({ name: 'image_path', nullable: true })
  imagePath?: string;

  constructor(init?: Partial<Sport>) {
    super();
    Object.assign(this, init);
  }
}
