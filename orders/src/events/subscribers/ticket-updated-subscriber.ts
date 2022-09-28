import { Message } from 'node-nats-streaming';
import { Subjects, Subscriber, TicketUpdatedEvent, BadRequestError } from '@ymtick/common';

import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedSubscriber extends Subscriber<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message): Promise<void> {
    const ticket = await Ticket.findByEvent(data);
    
    if (!ticket) throw new Error('Ticket not found');

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
