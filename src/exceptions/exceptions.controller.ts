import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateExceptionDto } from './dto/create-exception.dto.js';
import { ListExceptionsQueryDto } from './dto/list-exceptions-query.dto.js';
import { ExceptionsService } from './exceptions.service.js';

@Controller('exceptions')
export class ExceptionsController {
  constructor(private readonly exceptionsService: ExceptionsService) { }

  @Post()
  create(@Body() input: CreateExceptionDto) {
    return this.exceptionsService.create(input);
  }

  @Get()
  findAll(@Query() query: ListExceptionsQueryDto) {
    return this.exceptionsService.findAll(query.status);
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string) {
    return this.exceptionsService.resolve(id);
  }
}
