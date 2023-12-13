import { PageMetaDto } from './page-meta.dto';

export interface PageDto<T> {
  data: T[];
  meta: PageMetaDto;
}
