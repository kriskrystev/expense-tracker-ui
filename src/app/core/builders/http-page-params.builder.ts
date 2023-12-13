import { Order } from '../enums/order.enum';
import { HttpParamsBuilder } from './http-params.builder';

export class HttpPageParamsBuilder extends HttpParamsBuilder {
  constructor() {
    super();
  }

  appendOrder(value: Order) {
    this.append('order', value.toString());

    return this;
  }

  appendTake(value: number) {
    this.append('take', value);

    return this;
  }

  appendPage(value: number) {
    this.append('page', value);

    return this;
  }

  appendSkip(value: number) {
    this.append('skip', value);

    return this;
  }
}
