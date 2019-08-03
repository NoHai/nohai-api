import axios from 'axios';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

class Request1 {

    get lastResponse(): any {
        return this.lastResponseField;
    }

    get lastResponseBody(): any {
        return this.lastResponse.data;
    }

    private lastResponseField: any = undefined;

    async post(query: string, variables: any = {}): Promise<any> {
        return from(axios.post('http://localhost:5000/graphql/', { query, variables }))
            .pipe(tap((response) => this.lastResponseField = response))
            .toPromise();
    }
}

export const Request = new Request1();
