import { CreateCategoryResponseDto } from '../../categories/response/read-category.dto';

export interface CreateExpenseResponseDto {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: CreateCategoryResponseDto;
  // TODO: this categoryId is being duplicated in the category object
  // will be fixed on BE first
  categoryId: string;
}
