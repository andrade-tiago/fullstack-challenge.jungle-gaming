import { OmitType, PartialType } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { CreateTaskCommandDTO } from './create-task-command.dto'

export class UpdateTaskCommandDTO extends PartialType(
  OmitType(CreateTaskCommandDTO, ['userIds'])
) {
  @IsUUID('all')
  id!: string
}
