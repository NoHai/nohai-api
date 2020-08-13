import { Observable } from 'rxjs';
import { Comment as CommentResult } from '../../business/models/results/comment';
import { ICommentRepository } from '../repositories/i-comment-repository';
import { IGetComments } from './i-get-comments';


export class GetComments implements IGetComments {
    constructor(private commentRepository: ICommentRepository) { }

    execute(parameter: string): Observable<CommentResult[]> {
        return this.commentRepository.get(parameter);
    }
}
