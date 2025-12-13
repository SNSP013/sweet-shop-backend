import { IsNumber, Min } from 'class-validator';

export class PurchaseDto {
  @IsNumber()
  @Min(1)
  quantity: number;
}
