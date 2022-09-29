import { Publisher, Subjects, TicketUpdatedEvent } from "@ymtick/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
