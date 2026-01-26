import { ApiPropertyOptional } from '@nestjs/swagger'
import { PaginationQuery } from './pagination-query'
import { IsOptional } from 'class-validator'

export class PaginationRequest extends PaginationQuery {
  public static readonly DEFAULT_PAGE_SIZE = 10
  public static readonly DEFAULT_PAGE_NUMBER = 1

  @ApiPropertyOptional({
    example: PaginationRequest.DEFAULT_PAGE_SIZE,
    default: PaginationRequest.DEFAULT_PAGE_SIZE,
    description: 'Maximum number of items per page',
  })
  @IsOptional()
  pageSize: number = PaginationRequest.DEFAULT_PAGE_SIZE

  @ApiPropertyOptional({
    example: PaginationRequest.DEFAULT_PAGE_NUMBER,
    default: PaginationRequest.DEFAULT_PAGE_NUMBER,
    description: 'Number of page (one-indexed)',
  })
  @IsOptional()
  pageNumber: number = PaginationRequest.DEFAULT_PAGE_NUMBER
}
