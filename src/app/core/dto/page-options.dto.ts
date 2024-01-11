import { Order } from '../enums/order.enum';

export class PageOptionsDto {
  #order: Order;
  #page: number;
  #take: number;
  #skip: number;

  constructor(order?: Order, page?: number, take?: number, skip?: number) {
    this.#order = order || Order.ASC;
    this.#page = page || 1;
    this.#take = take || 5;
    this.#skip = skip || 0;
  }

  get skip(): number {
    return this.#skip;
  }

  set skip(value: number) {
    this.#skip = value;
  }

  get order(): Order {
    return this.#order;
  }

  get page(): number {
    return this.#page;
  }

  set page(page: number) {
    this.#page = page;
  }

  get take(): number {
    return this.#take;
  }

  set take(take: number) {
    this.#take = take;
  }
}
