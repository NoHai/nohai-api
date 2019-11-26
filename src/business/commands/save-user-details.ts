import { ISaveUserDetails } from './i-save-user-details';
import { UserDetailsInput } from '../models/inputs/user-details-input';
import { Observable, of, throwError, from } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { UserContext } from '../../utilities/user-context';
import { catchError, flatMap } from 'rxjs/operators';
import { Errors } from '../../utilities/errors';
import { User } from '../../data/entities/user';
import { UserDetails } from '../../data/entities/user-details';

export class SaveUserDetails implements ISaveUserDetails {
    constructor(private readonly userRepository: IUserRepository,
                private readonly userContext: UserContext) { }


    execute(input: UserDetailsInput): Observable<boolean> {
        const test = 'aec3e97a-a0df-4d83-9934-0df4acffc442';
        return this.userRepository.saveDetails(input, test)
            .pipe(catchError(() => throwError(new Error(Errors.GenericError))))
            .pipe(flatMap((details) => this.updateUserWithDetail(details)));
    }

    private updateUserWithDetail(details: any): Observable<boolean> {
        const test = 'aec3e97a-a0df-4d83-9934-0df4acffc442';
        if (details && details.id) {
            return from(User.findOneOrFail(test, { relations: ['details'] }))
                .pipe(flatMap((user) => {
                    user.details = new UserDetails({ id: details.id });
                    user.save();
                    return of(true);
                }))
             .pipe(catchError(() => throwError(new Error(Errors.GenericError))));
        } else {
            return of(false);
        }
    }
}
