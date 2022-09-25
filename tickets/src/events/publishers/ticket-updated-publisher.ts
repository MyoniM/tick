import { Publisher, Subjects, TicketUpdatedEvent } from '@ymtick/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
