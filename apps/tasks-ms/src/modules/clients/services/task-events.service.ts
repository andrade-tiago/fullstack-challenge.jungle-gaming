import { Inject, Injectable, Logger } from '@nestjs/common'
import { TASK_EVENTS_CLIENT } from '../clients'
import {
  TaskCommentedEvent,
  TaskCreatedEvent,
  TaskUpdatedEvent,
  type TaskCommentedEventPayloadDTO,
  type TaskCreatedEventPayloadDTO,
  type TaskUpdatedEventPayloadDTO } from '@packages/tasks'
import type { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class TaskEventsService {
  constructor(
    @Inject(TASK_EVENTS_CLIENT)
    private readonly _taskEvents: ClientProxy,
  ) {}

  public publishTaskCreated(payload: TaskCreatedEventPayloadDTO)
    : void
  {
    const event = new TaskCreatedEvent({ payload })

    this._taskEvents.emit('task.created', event)
  }

  public publishTaskUpdated(payload: TaskUpdatedEventPayloadDTO)
    : void
  {
    const event = new TaskUpdatedEvent({ payload })
    
    this._taskEvents.emit('task.updated', event)
  }

  public publishTaskCommented(payload: TaskCommentedEventPayloadDTO)
    : void
  {
    const event = new TaskCommentedEvent({ payload })
    
    this._taskEvents.emit('task.commented', event)
  }
}
