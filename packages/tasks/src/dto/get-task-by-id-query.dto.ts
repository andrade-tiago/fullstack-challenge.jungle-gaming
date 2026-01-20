import { IsUUID } from 'class-validator'

export class GetTaskByIdQueryDTO {
  @IsUUID('all')
  id!: string
}
