import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator'

export class ExistUsersQueryDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  userIds!: string[]
}
