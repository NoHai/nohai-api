import { ISaveUserDetails } from './i-save-user-details';
import { UserDetailsInput } from '../models/inputs/user-details-input';
import { Observable, of, throwError, from } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { UserContext } from '../../utilities/user-context';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Errors } from '../../utilities/errors';
import { User } from '../../data/entities/user';
import { UserDetails } from '../../data/entities/user-details';

export class SaveUserDetails implements ISaveUserDetails {
    constructor(private readonly userRepository: IUserRepository,
                private readonly userContext: UserContext) { }


    execute(input: UserDetailsInput): Observable<string> {
        return this.userRepository.saveDetails(input, this.userContext.userId)
            .pipe(catchError(() => throwError(new Error(Errors.GenericError))))
            .pipe(flatMap((details) => this.updateUserWithDetail(details)));
    }

    private updateUserWithDetail(details: any): Observable<string> {
        if (details && details.id) {
            return from(User.findOneOrFail(this.userContext.userId, { relations: ['details'] }))
                .pipe(map((user) => {
                    user.details = new UserDetails({ id: details.id });
                    user.save();
                    return user.id;
                }))
             .pipe(catchError(() => throwError(new Error(Errors.GenericError))));
        } else {
            return of('');
        }
    }
}
