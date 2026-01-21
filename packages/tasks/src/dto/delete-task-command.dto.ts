import { IsUUID } from 'class-validator'

export class DeleteTaskCommandDTO {
  @IsUUID('all')
  id!: string
}
