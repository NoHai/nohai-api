export class Email {
    to!: string;
    from!: string;
    text!: string;
    subject!: string;
    html!: string;

    constructor(init?: Partial<Email>) {
        Object.assign(this, init);
    }
}
