import { IActivateUser } from './i-activate-user';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { map, flatMap } from 'rxjs/operators';
import { UserFactory } from '../../data/factories/user-factory';

export class ActivateUser implements IActivateUser {
    constructor(private readonly userRepository: IUserRepository) { }

    execute(parameter: string): Observable<Credentials> {
        return this.userRepository.byCredentials(parameter)
            .pipe(map((user) => UserFactory.entity.fromUserResult(user)))
            .pipe(flatMap((entity) => {
                entity.enabled = true;
                return entity.save();
            }))
            .pipe(map((activeUser) => UserFactory.credentials.fromUserEntity(activeUser)));
    }
}
