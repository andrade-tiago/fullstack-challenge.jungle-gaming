import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateTaskCommandDTO } from './create-task-command.dto'

export class UpdateTaskDTO extends PartialType(
  OmitType(CreateTaskCommandDTO, ['userIds'])
) {}
