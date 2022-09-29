import { Subjects, Publisher, PaymentCreatedEvent } from "@ymtick/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
