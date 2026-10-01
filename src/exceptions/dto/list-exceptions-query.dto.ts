import { IsEnum, IsOptional } from 'class-validator';
import { ExceptionStatus } from '../exception.types.js';

export class ListExceptionsQueryDto {
    @IsOptional()
    @IsEnum(ExceptionStatus)
    status?: ExceptionStatus;
}