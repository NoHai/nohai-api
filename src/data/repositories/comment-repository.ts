import { from, Observable, of, throwError, zip } from 'rxjs';
import { catchError, flatMap, map, switchMap } from 'rxjs/operators';
import { CommentInput } from '../../business/models/inputs/comment-input';
import { Comment as CommentResult } from '../../business/models/results/comment';
import { ICommentRepository } from '../../business/repositories/i-comment-repository';
import { UserContext } from '../../utilities/user-context';
import { Comment } from '../entities/comment';
import { CommentFactory } from '../factories/comment-factory';

export class CommentRepository implements ICommentRepository {
    constructor(private readonly userContext: UserContext) {
    }

    insert(input: CommentInput): Observable<CommentResult> {
        const commentInput = of(CommentFactory.entity.fromCommentInput(input, this.userContext.userId));

        return zip(commentInput)
            .pipe(flatMap((result) => {
                return result[0].save();
            }))
            .pipe(catchError((e) => throwError(new Error(e))))
            .pipe(map((comment) => CommentFactory.result.fromCommentEntity(comment)));
    }

    update(input: CommentInput): Observable<CommentResult> {
        return of(CommentFactory.entity.fromCommentInput(input, input.authorId))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => CommentFactory.result.fromCommentEntity(entity)));
    }

    getById(id: any): Observable<CommentResult> {
        return from(Comment.findOneOrFail(id, { relations: ['user'] }))
            .pipe(map((event) => CommentFactory.result.fromCommentEntity(event)));
    }

    delete(id: string): Observable<boolean> {
        return from(Comment.findOneOrFail(id))
            .pipe(map((entity) => {
                entity.isDeleted = true;
                entity.save();
                return true;
            }))
            .pipe(catchError(() => of(false)));
    }
}
