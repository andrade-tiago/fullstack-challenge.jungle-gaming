import { ApiProperty } from '@nestjs/swagger'

export class AuthenticatedUser {
  @ApiProperty({
    example: '50a26655-9093-4319-abdc-d48884d2dd66',
  })
  id!: string

  @ApiProperty({
    example: 'foobar',
  })
  username!: string

  @ApiProperty({
    example: 'foobar@email.com',
  })
  email!: string
}
