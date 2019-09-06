
import { Nothing } from '../../../business/models/nothing';
import { ICreateUserContext } from './i-create-user-context';
import { AuthHelper } from '../../../utilities/auth-helper';
import { Observable, of } from 'rxjs';
import { UserContext } from '../../../utilities/user-context';

export class CreateUserContext implements ICreateUserContext {

    constructor(private readonly userContext: UserContext) {

    }

    execute(input?: any): Observable<Nothing> {
        const authToken = input.headers.authorization;
        if (AuthHelper.verifyToken(authToken) === true) {

            const decodedToken = AuthHelper.decodeToken(authToken);
            console.log(decodedToken);

            this.userContext.userId = 'gsadfjkagsdf';
        }
        return of(Nothing);
    }

}
