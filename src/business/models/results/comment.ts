export class Comment {
  id!: string;
  userId!: string;
  eventId!: string;
  description!: string;
  date!: Date;
  isDeleted!: boolean;

  constructor(init?: any) {
    Object.assign(this, init);
    this.isDeleted = false;
  }
}
