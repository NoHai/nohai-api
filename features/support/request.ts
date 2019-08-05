import axios from 'axios';
import { from, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

class RequestSupport {

    get lastResponse(): any {
        return this.lastResponseField;
    }

    get lastResponseBody(): any {
        return this.lastResponse.data;
    }

    private lastResponseField: any = undefined;

    async post(query: string, variables: any = {}): Promise<any> {
        return from(axios.post('http://localhost:5000/graphql/', { query, variables }))
            .pipe(catchError((error) => of(error.response)))
            .pipe(tap((response) => this.lastResponseField = response))
            .toPromise();
    }
}

export const Request = new RequestSupport();
