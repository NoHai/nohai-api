import { Observable } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';
import * as bcrypt from 'bcrypt';

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Credentials> {
        const salt = bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(input.password, salt);
        const hashedInput = new CredentialsInput({ password: hash, login: input.login });

        return this.userRepository.insert(hashedInput);
    }
}
