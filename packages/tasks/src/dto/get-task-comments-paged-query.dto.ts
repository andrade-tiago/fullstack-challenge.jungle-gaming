import { PaginationQuery } from '@packages/types'
import { IsUUID } from 'class-validator'

export class GetTaskCommentsPagedQueryDTO extends PaginationQuery {
  @IsUUID()
  taskId!: string
}
