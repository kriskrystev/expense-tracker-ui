export interface CreateCategoryResponseDto {
  id: string;
  name: string;
  description: string;
}

export type ReadCategoryDto = CreateCategoryResponseDto;