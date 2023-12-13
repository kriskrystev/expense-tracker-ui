import { Order } from '../enums/order.enum';

export class PageOptionsDto {
  #order: Order;
  #page: number;
  #take: number;

  constructor(order?: Order, page?: number, take?: number) {
    this.#order = order || Order.ASC;
    this.#page = page || 1;
    this.#take = take || 10;
  }

  get skip(): number {
    return (this.#page - 1) * this.#take;
  }

  get order(): Order {
    return this.#order;
  }

  get page(): number {
    return this.#page;
  }

  get take(): number {
    return this.#take;
  }
}
