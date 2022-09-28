import { BadRequestError, OrderCreatedEvent, OrderStatus, Subjects, Subscriber } from '@ymtick/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

import { queueGroupName } from './queue-group-name';

export class OrderCreatedSubscriber extends Subscriber<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //  Lock the ticket
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) throw new BadRequestError('Ticket not found');

    ticket.set({ orderId: data.id });
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
