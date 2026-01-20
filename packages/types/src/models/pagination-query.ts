import { Type } from 'class-transformer'
import { IsInt, IsNumber, Max, Min } from 'class-validator'

export class PaginationQuery {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize!: number

  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  pageNumber!: number
}
