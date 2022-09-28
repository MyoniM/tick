import { Message } from 'node-nats-streaming';
import { Subjects, Subscriber, TicketCreatedEvent } from '@ymtick/common';

import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedSubscriber extends Subscriber<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;
  
  async onMessage(data: TicketCreatedEvent['data'], msg: Message): Promise<void> {
    const { id, title, price } = data;
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    console.log(ticket);

    msg.ack();
  }
}
