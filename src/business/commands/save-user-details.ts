import { from, Observable, of, throwError, zip } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { UserDetails } from '../../data/entities/user-details';
import { Errors } from '../../utilities/errors';
import { UserContext } from '../../utilities/user-context';
import { UserDetailsInput } from '../models/inputs/user-details-input';
import { IUserRepository } from '../repositories/i-user-repository';
import { ISaveUserDetails } from './i-save-user-details';
import { User } from '../../data/entities/user';
import { User as UserResult } from '../models/results/user';
import { UserFactory } from '../../data/factories/user-factory';
import { UserSports } from '../../data/entities/user_sports';


export class SaveUserDetails implements ISaveUserDetails {
    constructor(private readonly userRepository: IUserRepository,
                private readonly userContext: UserContext) { }


    execute(input: UserDetailsInput): Observable<UserResult | undefined> {
        return this.userRepository.saveDetails(input, this.userContext.userId)
            .pipe(catchError(() => throwError(new Error(Errors.GenericError))))
            .pipe(flatMap((details) => this.updateUserWithDetail(details)));
    }

    private updateUserWithDetail(details: any): Observable<UserResult | undefined> {
        if (details && details.id) {
            const sportFlow = from(UserSports.find({ user: details.userId }));
            const userFlow = from(User.findOneOrFail(details.userId, { relations: ['details'] }))
                            .pipe(
                                map((user) => {
                                    user.details = new UserDetails({ id: details.id });
                                    user.save();
                                    user.details = details;
                                    return UserFactory.result.fromUserEntity(user);}))
                                    .pipe(catchError(() => throwError(new Error(Errors.GenericError))));
                                    return zip(userFlow, sportFlow).pipe(flatMap((result) => {
                                        if (result[0].details !== null) {
                                            result[0].details.favoriteSports = result[1];
                                        }
                                        return of(result[0]);
                                    }));
                                } else {
                                    return of(undefined);
                                }
                            }
                        }
