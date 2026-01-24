import { Type } from '@nestjs/common'
import { Pagination } from '@packages/types'
import { ApiProperty } from '@nestjs/swagger'

export function ApiPagination<T>(classRef: Type<T>) {
  class ApiPagination extends Pagination<T> {
    @ApiProperty({
      type: [classRef],
    })
    declare data: readonly T[]

    @ApiProperty({
      example: 100,
    })
    declare totalCount: number

    @ApiProperty({
      example: 1,
    })
    declare pageNumber: number

    @ApiProperty({
      example: 10,
    })
    declare pageSize: number

    @ApiProperty({
      example: 10,
    })
    declare totalPages: number
  }

  return ApiPagination
}
