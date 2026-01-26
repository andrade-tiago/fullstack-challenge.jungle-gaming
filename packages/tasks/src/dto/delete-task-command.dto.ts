import { PickType } from '@nestjs/swagger'
import { UpdateTaskCommandDTO } from './update-task-command.dto'

export class DeleteTaskCommandDTO
  extends PickType(UpdateTaskCommandDTO, ['id', 'userId'])
{}
