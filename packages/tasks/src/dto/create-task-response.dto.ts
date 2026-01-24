import { ApiProperty } from '@nestjs/swagger'
import { CreateTaskCommandResponseDTO } from './create-task-command-response.dto'

export class CreateTaskResponseDTO extends CreateTaskCommandResponseDTO {
  @ApiProperty({
    example: '50a26655-9093-4319-abdc-d48884d2dd66',
  })
  declare id: string
}
