import { Request, Response } from 'express';
import { CredentialsInput } from '../business/models/inputs/credentials-input';
import { ICreateTokens } from '../business/commands/i-create-tokens';
import { IRefreshToken } from '../business/commands/i-refresh-token';

export class AuthController {
    constructor(private readonly createTokens: ICreateTokens,
                private readonly refreshToken: IRefreshToken) {
    }

    async login(req: Request, res: Response) {
        if (req.body) {
            const credentials: CredentialsInput = req.body;
            const tokens = await this.createTokens.execute(credentials).toPromise();

            res.send(tokens);
        }
    }

    async refresh(req: Request, res: Response) {
        if (req.body) {
            const refreshToken: string = req.body.refreshToken;
            const tokens = await this.refreshToken.execute(refreshToken).toPromise();

            res.send(tokens);
        }
    }
}
