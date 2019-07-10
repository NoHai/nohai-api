import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserInput } from '../../business/models/inputs/user-input';
import { User as UserResult } from '../../business/models/results/user';
import { IUserRepository } from '../../business/repositories/i-user-repository';
import { UserFactory } from '../factories/user-factory';

export class UserRepository implements IUserRepository {
    insert(input: UserInput): Observable<UserResult> {
        return of(UserFactory.makeEntity(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => UserFactory.makeResult(entity)));
    }
}
