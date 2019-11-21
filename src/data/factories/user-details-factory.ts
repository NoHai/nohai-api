import { UserDetailsInput } from '../../business/models/inputs/user-details-input';
import { UserDetails } from '../entities/user-details';
import { UserDetails as UserDetailsResult } from '../../business/models/results/user-details';

export class UserDetailsFactory {

    static entity = {
        fromUserDetailsInput: (input: UserDetailsInput, userId: string) => new UserDetails({
            ...input,
            userId,
        }),
    };

    static result = {
        fromUserDetailsEntity: (input: UserDetails) => new UserDetailsResult(input),
    };
}
