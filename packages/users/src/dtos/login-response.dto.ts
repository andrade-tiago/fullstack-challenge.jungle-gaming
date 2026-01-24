import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseDTO {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4OWQyMTJlLWUzNzgtNDU2NS1hYjQ1LTc4OGI1NGUwY2VlMCIsInVzZXJuYW1lIjoiZXVnZW5pYSIsImVtYWlsIjoiZXVnZW5pYUBlbWFpbC5jb20iLCJpYXQiOjE3NjkwNTIxNTEsImV4cCI6MTc2OTA1NTc1MX0.nST4l6Do1992YuqxI9EZXPGqDwRmy29aV3PN6Xn3TaU',
  })
  accessToken!: string

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4OWQyMTJlLWUzNzgtNDU2NS1hYjQ1LTc4OGI1NGUwY2VlMCIsInVzZXJuYW1lIjoiZXVnZW5pYSIsImVtYWlsIjoiZXVnZW5pYUBlbWFpbC5jb20iLCJpYXQiOjE3NjkwNTIxNTEsImV4cCI6MTc2OTA1NTc1MX0.nST4l6Do1992YuqxI9EZXPGqDwRmy29aV3PN6Xn3TaU',
  })
  refreshToken!: string
}
