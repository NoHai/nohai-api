import { IUpdateCredentials } from './i-update-credentials';
import { Observable } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';

export class UpdateCredentials implements IUpdateCredentials {
    constructor(private readonly userRepository: IUserRepository) { }

    execute(input: any): Observable<void> {
      return this.userRepository.updateCredentials(input.email, input.password);
    }
}
