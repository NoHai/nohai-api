import { EventInput } from './event-input';

export class UpdateEventInput extends EventInput {
    id!: string;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
