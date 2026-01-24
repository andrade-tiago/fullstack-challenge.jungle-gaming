import { ApiProperty } from '@nestjs/swagger'
import { PaginationQuery } from './pagination-query'

export class PaginationRequest extends PaginationQuery {
  public static readonly DEFAULT_PAGE_SIZE = 10
  public static readonly DEFAULT_PAGE_NUMBER = 1

  @ApiProperty({
    example: PaginationRequest.DEFAULT_PAGE_SIZE,
    default: PaginationRequest.DEFAULT_PAGE_SIZE,
    description: 'Maximum number of items per page',
  })
  declare pageSize: number

  @ApiProperty({
    example: PaginationRequest.DEFAULT_PAGE_NUMBER,
    default: PaginationRequest.DEFAULT_PAGE_NUMBER,
    description: 'Number of page',
  })
  declare pageNumber: number
}
