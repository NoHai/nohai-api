import { IUpdateCredentials } from './i-update-credentials';
import { Observable } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { CredentialsInput } from '../models/inputs/credentials-input';

export class UpdateCredentials implements IUpdateCredentials {
    constructor(private readonly userRepository: IUserRepository) { }

    execute(input: CredentialsInput): Observable<void> {
      return this.userRepository.updateCredentials(input);
    }
}
