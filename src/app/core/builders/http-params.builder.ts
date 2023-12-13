import { HttpParams } from '@angular/common/http';
import { HttpParametersBuilder } from '../interfaces/http-params-builder.interface';

export class HttpParamsBuilder implements HttpParametersBuilder {
  private params: HttpParams;

  constructor() {
    this.params = new HttpParams();
  }

  append(
    param: string,
    value: string | number | boolean | undefined
  ): HttpParamsBuilder {
    if (value) {
      this.params = this.params.append(param, value);
    }

    return this;
  }

  build(): HttpParams {
    return this.params;
  }
}
