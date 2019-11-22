import { ISaveUserDetails } from './i-save-user-details';
import { UserDetailsInput } from '../models/inputs/user-details-input';
import { Observable, of, throwError } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { UserContext } from '../../utilities/user-context';
import { catchError, flatMap } from 'rxjs/operators';
import { Errors } from '../../utilities/errors';

export class SaveUserDetails implements ISaveUserDetails {
    constructor(private readonly userRepository: IUserRepository,
                private readonly userContext: UserContext) { }

    execute(input: UserDetailsInput): Observable<boolean> {
        const testUserId = '70060c58-1a78-47c4-80be-a7a7f3355e38';
        return this.userRepository.saveDetails(input, testUserId)
            .pipe(catchError(() => throwError(new Error(Errors.GenericError))))
            .pipe(flatMap((details) => of(details.id !== undefined ? true : false)));
    }
}
