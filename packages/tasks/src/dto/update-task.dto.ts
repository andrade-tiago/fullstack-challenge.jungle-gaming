import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateTaskCommandDTO } from './create-task-command.dto'

export class UpdateTaskDTO extends PartialType(
  OmitType(CreateTaskCommandDTO, ['userIds'])
) {}
