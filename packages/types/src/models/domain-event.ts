import { randomUUID } from 'node:crypto'

export type DomainEventProps = 
  Pick<DomainEvent, 'eventType' | 'payload'>
  & Partial<Pick<DomainEvent, 'occurredAt'>>

export class DomainEvent {
  public readonly eventId: string
  public readonly occurredAt: Date
  public readonly eventType: any
  public readonly payload: any

  public constructor({ occurredAt, ...props }: DomainEventProps) {
    this.eventId = randomUUID()
    this.occurredAt = occurredAt ?? new Date()

    Object.assign(this, props)
  }
}
