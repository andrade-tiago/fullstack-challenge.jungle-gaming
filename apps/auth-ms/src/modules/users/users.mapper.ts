import type { User } from './user.entity'
import type { UserDTO } from '@packages/users'

export class UsersMapper {
  toDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    }
  }
}
