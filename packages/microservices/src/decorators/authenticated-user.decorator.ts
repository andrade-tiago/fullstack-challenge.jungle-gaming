import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthenticatedUser } from '@packages/users'

export const User = createParamDecorator(
(
  key: keyof AuthenticatedUser | undefined,
  context: ExecutionContext,
) => {
  const request = context.switchToHttp().getRequest()
  const user = request.user

  return key ? user?.[key] : user
})
