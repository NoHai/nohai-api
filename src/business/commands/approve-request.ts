import { IApproveRequest } from './i-approve-request';
import { Observable } from 'rxjs';

export class ApproveRequest implements IApproveRequest {

    execute(input?: string | undefined): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
}
