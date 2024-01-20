import { ExpenseUi } from '../ui/expense';
import { CreateExpenseRequestDto } from './create-expense.dto';

export type UpdateExpenseRequestDto = CreateExpenseRequestDto & ExpenseUi;
