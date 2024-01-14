export interface CreateExpenseRequestDto {
  description: string;
  amount: number;
  categoryId: string;
  date: Date | string;
}
