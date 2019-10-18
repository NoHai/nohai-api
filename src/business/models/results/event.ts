 import { EventInput } from '../inputs/event-input';

 export class Event extends EventInput {
     id!: string;
     numberOfParticipants!: number;
     createdDate: any;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
