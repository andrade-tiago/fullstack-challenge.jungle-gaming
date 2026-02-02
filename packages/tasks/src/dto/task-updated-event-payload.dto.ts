import { OmitType } from '@nestjs/swagger'
import { UpdateTaskCommandDTO } from './update-task-command.dto'

export class TaskUpdatedEventPayloadDTO
  extends OmitType(UpdateTaskCommandDTO, ['userId'])
{

}
