import { LogAction } from '@/entities'

export type CreateTaskLogDTO = {
  taskId: string
  userId: string
  action: LogAction
  metadata?: any
}
