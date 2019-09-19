export class Email {
    to!: string;
    from!: string;
    message!: string;
    subject!: string;
    html!: string;

    constructor(init?: Partial<Email>) {
        Object.assign(this, init);
    }
}
