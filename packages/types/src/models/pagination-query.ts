import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsNumber, Max, Min } from 'class-validator'

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE_NUMBER = 1

export class PaginationQuery {
  @ApiProperty({
    example: DEFAULT_PAGE_SIZE,
    default: DEFAULT_PAGE_SIZE,
    description: 'Maximum number of items per page',
  })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number = DEFAULT_PAGE_SIZE

  @ApiProperty({
    example: DEFAULT_PAGE_NUMBER,
    default: DEFAULT_PAGE_NUMBER,
    description: 'Number of page',
  })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  pageNumber: number = DEFAULT_PAGE_NUMBER
}
