import { User } from '../../../data/entities/user';

export class Comment {
  id!: string;
  user!: User;
  eventId!: string;
  description!: string;
  date!: Date;
  isDeleted!: boolean;

  constructor(init?: any) {
    Object.assign(this, init);
    this.isDeleted = false;
  }
}
