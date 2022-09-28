import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@ymtick/common';
import { OrderCreatedSubscriber } from '../order-created-subscriber';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // Create an instance of the subscriber
  const subscriber = new OrderCreatedSubscriber(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf',
  });
  await ticket.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'alskdfj',
    expiresAt: 'alskdjf',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { subscriber, ticket, data, msg };
};

it('sets the userId of the ticket', async () => {
  const { subscriber, ticket, data, msg } = await setup();

  await subscriber.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { subscriber, ticket, data, msg } = await setup();
  await subscriber.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
