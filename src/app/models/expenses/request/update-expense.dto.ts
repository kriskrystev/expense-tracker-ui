import { ExpenseUi } from '../ui/expense';
import { CreateExpenseRequestDto } from './create-expense.dto';

export type UpdateExpenseRequestDto = CreateExpenseRequestDto & ExpenseUi;
export type UpdateExpenseResponseDto = UpdateExpenseRequestDto;
