import { IsInt, IsNumber, Max, Min } from 'class-validator'

export class PaginationQuery {
  private static readonly PAGE_SIZE_MIN = 1
  private static readonly PAGE_SIZE_MAX = 100
  private static readonly PAGE_NUMBER_MIN = 1

  @IsNumber()
  @IsInt()
  @Min(PaginationQuery.PAGE_SIZE_MIN)
  @Max(PaginationQuery.PAGE_SIZE_MAX)
  pageSize!: number

  @IsNumber()
  @IsInt()
  @Min(PaginationQuery.PAGE_NUMBER_MIN)
  pageNumber!: number
}
