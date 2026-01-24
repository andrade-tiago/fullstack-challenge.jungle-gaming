import { UsersConstants } from '@packages/users'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('varchar', { name: 'username',
    length: UsersConstants.USERS_USERNAME_MAX_LENGTH,
  })
  username!: string

  @Column('varchar', { name: 'email',
    length: UsersConstants.USERS_EMAIL_MAX_LENGTH,
    unique: true,
  })
  email!: string

  @Column('varchar', { name: 'password',
    length: 255, // Safe limit.
  })
  password!: string
}
