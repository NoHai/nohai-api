import { from } from 'rxjs';
import { Comment as CommentResult } from '../../business/models/results/comment';
import { Comment, Comment as CommentEntity } from '../entities/comment';
import { CommentInput } from '../../business/models/inputs/comment-input';
import { UserFactory } from './user-factory';
import { EventFactory } from './event-factory';

export class CommentFactory {

    static entity = {
        fromCommentResult: (comment: CommentResult) => new CommentEntity(comment),
        fromId: (id: string) => from(Comment.findOne(id)),
        fromCommentInput: (comment: CommentInput, userId: string): CommentEntity => new CommentEntity({
            ...comment,
            description: comment.description,
            date: comment.date,
            user: UserFactory.entity.fromId(userId),
            event: EventFactory.entity.fromId(comment.eventId),
        }),
    };

    static result = {
        fromCommentEntity: (comment: CommentEntity) => new CommentResult(comment),
    };

    static results = {
        fromCommentEntities: (comments: CommentEntity[]): CommentResult[] =>
        comments.map((comment) => new CommentResult(comment)),
    };
}
