import { Comment } from '@/entities/comment.entity'
import { CommentPublicDTO } from '@packages/tasks'

export class CommentsMapper {
  public toPublicDTO(comment: Comment): CommentPublicDTO {
    return {
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
    }
  }
}
