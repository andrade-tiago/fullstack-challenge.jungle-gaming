import { TaskEvent, TaskEventProps } from './task-event.model'
import { TaskEventEnum } from '../enums'
import type { TaskCreatedEventPayloadDTO } from '../dto'

type TaskCreatedEventProps =
  Omit<TaskEventProps, 'eventType' | 'payload'>
  & { payload: TaskCreatedEventPayloadDTO }

export class TaskCreatedEvent extends TaskEvent {
  public constructor(props: TaskCreatedEventProps) {
    super({
      ...props,
      eventType: TaskEventEnum.TaskCreated,
    })
  }
}
