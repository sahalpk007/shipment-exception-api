import { IsEnum, IsString, MinLength } from 'class-validator';
import { ExceptionType } from '../exception.types.js';

export class CreateExceptionDto {
  @IsString()
  @MinLength(1)
  shipmentId!: string;

  @IsEnum(ExceptionType)
  type!: ExceptionType;

  @IsString()
  @MinLength(10)
  description!: string;
}
