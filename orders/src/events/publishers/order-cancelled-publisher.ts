import { Subjects, Publisher, OrderCancelledEvent } from "@ymtick/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
