import { UsersContants } from '@packages/users'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('varchar', { name: 'username',
    length: UsersContants.USERS_USERNAME_MAX_LENGTH,
    unique: true,
  })
  username!: string

  @Column('varchar', { name: 'email',
    length: UsersContants.USERS_EMAIL_MAX_LENGTH,
    unique: true,
  })
  email!: string

  @Column('varchar', { name: 'password',
    length: 255, // Safe limit.
  })
  password!: string
}
