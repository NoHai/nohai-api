import { Observable } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Credentials> {
        return this.userRepository.insert(input);
    }
}
