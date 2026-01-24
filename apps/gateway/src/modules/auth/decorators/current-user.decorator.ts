import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthenticatedUser } from '@packages/users'

export const CurrentUser = createParamDecorator(
  (property: keyof AuthenticatedUser | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    return property ? user?.[property] : user
  },
)
