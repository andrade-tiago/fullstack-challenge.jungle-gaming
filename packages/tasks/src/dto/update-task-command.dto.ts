import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { CreateTaskCommandDTO } from './create-task-command.dto'

export class UpdateTaskCommandDTO extends IntersectionType(
  PartialType(
    OmitType(CreateTaskCommandDTO, ['userId', 'userIds'])
  ),
  PickType(CreateTaskCommandDTO, ['userId'])
) {
  @IsUUID('all')
  id!: string
}
