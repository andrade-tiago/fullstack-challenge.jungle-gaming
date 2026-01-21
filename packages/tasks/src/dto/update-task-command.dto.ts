import { IsUUID } from 'class-validator'
import { UpdateTaskDTO } from './update-task.dto'

export class UpdateTaskCommandDTO extends UpdateTaskDTO {
  @IsUUID('all')
  id!: string
}
