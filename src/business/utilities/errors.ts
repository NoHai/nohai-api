export class Errors {

    static readonly  NotRegisteredError: any =  {
        message: 'The email is not registered',
        status: 401,
    };

    static readonly IncorrectPassowordError: any =  {
        message: 'The password is incorect',
        status: 401,
    };

    static readonly AlreadyRegisterdError: any =  {
        message: 'The email was already registerd',
        status: 401,
    };

}
