import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateExceptionDto } from './dto/create-exception.dto.js';
import { ExceptionsService } from './exceptions.service.js';

@Controller('exceptions')
export class ExceptionsController {
  constructor(private readonly exceptionsService: ExceptionsService) {}

  @Post()
  create(@Body() input: CreateExceptionDto) {
    return this.exceptionsService.create(input);
  }

  @Get()
  findAll() {
    return this.exceptionsService.findAll();
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string) {
    return this.exceptionsService.resolve(id);
  }
}
