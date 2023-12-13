import { HttpParams } from '@angular/common/http';
import { HttpParamsBuilder } from '../builders/http-params.builder';

export interface HttpParametersBuilder {
  append(param: string, value: string | number | boolean): HttpParamsBuilder;
  build(): HttpParams;
}
