import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateTaskRequestDTO } from './create-task-request.dto'

export class UpdateTaskRequestDTO extends PartialType(
  OmitType(CreateTaskRequestDTO, ['userIds'])
) {}
