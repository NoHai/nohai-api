import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { Credentials } from '../../business/models/results/credentials';
import { IUserRepository } from '../../business/repositories/i-user-repository';
import { CredentialsFactory } from '../factories/credentials-factory';
import { UserFactory } from '../factories/user-factory';

export class UserRepository implements IUserRepository {
    insert(input: CredentialsInput): Observable<Credentials> {
        return of(UserFactory.entity.fromCredentialsInput(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => CredentialsFactory.result.fromUserEntity(entity)));
    }
}

