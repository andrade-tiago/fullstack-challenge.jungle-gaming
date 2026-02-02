import { DomainEvent, DomainEventProps } from '@packages/types'
import { TaskEventEnum } from '../enums'

export type TaskEventProps =
  Omit<DomainEventProps, 'eventType'>
  & Pick<TaskEvent, 'eventType'>

export abstract class TaskEvent extends DomainEvent {
  declare eventType: TaskEventEnum

  public constructor(props: TaskEventProps) {
    super(props)
  }
}
