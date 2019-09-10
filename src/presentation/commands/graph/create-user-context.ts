
import { Nothing } from '../../../business/models/nothing';
import { ICreateUserContext } from './i-create-user-context';
import { AuthHelper } from '../../../utilities/auth-helper';
import { Observable, of } from 'rxjs';
import { UserContext } from '../../../utilities/user-context';

export class CreateUserContext implements ICreateUserContext {

    constructor(private readonly userContext: UserContext) {

    }

    execute(input?: any): Observable<Nothing> {
        const authToken: string = input.authorization || '';
        if (authToken) {
            const auth = authToken.replace('Bearer ', '');
            const decodedToken: any = AuthHelper.verifyToken(auth);
            this.userContext.userId = decodedToken.userId || '';
        }

        return of(Nothing);
    }

}
