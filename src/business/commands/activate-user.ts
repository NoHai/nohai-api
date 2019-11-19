import { IActivateUser } from './i-activate-user';
import { Observable } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';

export class ActivateUser implements IActivateUser {
    constructor(private readonly userRepository: IUserRepository) { }

    execute(parameter: string): Observable<boolean> {
        return this.userRepository.activate(parameter);
    }
}
