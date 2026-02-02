import { TaskEvent, type TaskEventProps } from './task-event.model'
import { TaskEventEnum } from '../enums'
import type { TaskUpdatedEventPayloadDTO } from '../dto'

type TaskUpdatedEventProps = Omit<TaskEventProps, 'eventType' | 'payload'>
  & { payload: TaskUpdatedEventPayloadDTO }

export class TaskUpdatedEvent extends TaskEvent {
  public constructor(props: TaskUpdatedEventProps) {
    super({
      ...props,
      eventType: TaskEventEnum.TaskUpdated,
    })
  }
}
