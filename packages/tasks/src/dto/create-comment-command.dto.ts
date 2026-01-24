import {
  IsString,
  IsUUID,
  MaxLength,
  MinLength } from 'class-validator'
import { CommentsConstants } from '../constants'

export class CreateCommentCommandDTO {
  @IsUUID('all')
  taskId!: string

  @IsUUID('all')
  userId!: string

  @IsString()
  @MinLength(CommentsConstants.COMMENT_CONTENT_MIN_LENGTH)
  @MaxLength(CommentsConstants.COMMENT_CONTENT_MAX_LENGTH)
  content!: string
}
