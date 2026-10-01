import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExceptionDto } from './dto/create-exception.dto.js';
import {
  ExceptionStatus,
  ShipmentException,
} from './exception.types.js';

@Injectable()
export class ExceptionsService {
  private readonly records: ShipmentException[] = [];
  private nextId = 1;

  create(input: CreateExceptionDto): ShipmentException {
    const record: ShipmentException = {
      id: `EXC-${this.nextId++}`,
      shipmentId: input.shipmentId,
      type: input.type,
      description: input.description,
      status: ExceptionStatus.OPEN,
    };

    this.records.push(record);
    return { ...record };
  }
    findAll(): ShipmentException[] {
    return this.records.map((record) => ({ ...record }));
  }

  resolve(id: string): ShipmentException {
    const record = this.records.find((item) => item.id === id);

    if (!record) {
      throw new NotFoundException(`Exception ${id} not found`);
    }

    record.status = ExceptionStatus.RESOLVED;
    return { ...record };
  }

}
