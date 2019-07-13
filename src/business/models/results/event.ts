import { EventInput } from '../inputs/event-input';

export class Event extends EventInput {
    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
