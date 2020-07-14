import { UserDetailsInput } from '../../business/models/inputs/user-details-input';
import { UserDetails } from '../entities/user-details';
import { UserDetails as UserDetailsResult } from '../../business/models/results/user-details';
import { User } from '../entities/user';
import { AuthHelper } from '../../utilities/auth-helper';

export class UserDetailsFactory {

    static entity = {
        fromUserDetailsInput: (input: UserDetailsInput, user: User) => new UserDetails({
            ...input,
            userId: user.id,
            picture: AuthHelper.hashEmail(user.login),
            favoriteSports: input.favoriteSports.map((userSport) => {
                userSport.user = user;
                return userSport;
            }),
    }),
};

    static result = {
    fromUserDetailsEntity: (input: UserDetails) => new UserDetailsResult(input),
};
}
