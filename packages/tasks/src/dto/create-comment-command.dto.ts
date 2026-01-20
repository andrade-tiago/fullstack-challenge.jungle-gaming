import {
  IsString,
  IsUUID,
  MaxLength,
  MinLength } from 'class-validator'
import * as CommentConsts from '../constants/comments.contants'

export class CreateCommentCommandDTO {
  @IsUUID('all')
  taskId!: string

  @IsUUID('all')
  userId!: string

  @IsString()
  @MinLength(CommentConsts.COMMENT_CONTENT_MIN_LENGTH)
  @MaxLength(CommentConsts.COMMENT_CONTENT_MAX_LENGTH)
  content!: string
}
