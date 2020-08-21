import { Observable } from 'rxjs';
import { CommentInput } from '../models/inputs/comment-input';
import { ICommentRepository } from '../repositories/i-comment-repository';
import { ICreateComment } from './i-create-comment';



export class CreateComment implements ICreateComment {
  constructor(private readonly commentRepository: ICommentRepository) { }

  execute(input: CommentInput): Observable<any> {
      return this.commentRepository.insert(input);
  }
}
