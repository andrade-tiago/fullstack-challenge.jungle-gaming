import type { User } from '../../entities/user.entity'
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
