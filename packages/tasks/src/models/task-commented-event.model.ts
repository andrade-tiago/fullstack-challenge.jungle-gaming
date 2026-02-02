import { TaskEvent, type TaskEventProps } from './task-event.model'
import { TaskEventEnum } from '../enums'
import type { TaskCommentedEventPayloadDTO } from '../dto/task-commented-event-payload.dto'

type TaskCommentedEventProps = Omit<TaskEventProps, 'eventType' | 'payload'>
  & { payload: TaskCommentedEventPayloadDTO }

export class TaskCommentedEvent extends TaskEvent {
  public constructor(props: TaskCommentedEventProps) {
    super({
      ...props,
      eventType: TaskEventEnum.TaskCommented,
    })
  }
}
