import { Observable } from 'rxjs';
import { CommentInput } from '../models/inputs/comment-input';
import { Comment as CommentResult } from '../../business/models/results/comment';


export interface ICommentRepository {

    get(eventId: string): Observable<CommentResult[]>;

    insert(comment: CommentInput): Observable<CommentResult>;

    update(input: CommentInput): Observable<CommentResult>;

    getById(id: string): Observable<CommentResult>;

    delete(id: string): Observable<boolean>;
}
