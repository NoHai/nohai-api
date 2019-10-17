export class Errors {
    static readonly Unauthorized: string =  'Mai  intai trebuie sa fiti autentificat';
    static readonly NotRegistered: string = 'Adresa de email nu este inregistrata.';
    static readonly IncorrectPassoword: string = 'User sau parola incorecte.';
    static readonly AlreadyRegisterd: string = 'Exista deja un cont cu aceasi adresa de email';
    static readonly UnableToLogin: string = 'Logare nereusita. Te rugam reincearca.';
    static readonly AllSpotsOccupied: string = 'Ne pare rau dar toate locurile s-au ocupat intre timp';
    static readonly UnableToSendEmail: string = 'Emailul nu s-a putut trimite';
    static readonly JoinRequestAlreadySent: string = 'O cerere de alaturare la eveniment a fost deja trimisa';
}
