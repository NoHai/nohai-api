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
        const testUserId = '7d63def4-7d2d-4219-a666-02c229ce2d87';
        return this.userRepository.saveDetails(input, testUserId)
            .pipe(catchError(() => throwError(new Error(Errors.GenericError))))
            .pipe(flatMap((details) => of(details.id !== undefined ? true : false)));
    }
}
