import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateSweetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;
}
