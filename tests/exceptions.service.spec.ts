import { expect, test } from '@playwright/test';
import {
  ExceptionStatus,
  ExceptionType,
} from '../src/exceptions/exception.types.js';
import { ExceptionsService } from '../src/exceptions/exceptions.service.js';

test('service creates and resolves an exception', () => {
  const service = new ExceptionsService();
  const created = service.create({
    shipmentId: 'SHIP-1001',
    type: ExceptionType.DELAY,
    description: 'Carrier missed the scheduled collection window.',
  });

  expect(created.id).toBe('EXC-1');
  expect(created.status).toBe(ExceptionStatus.OPEN);

  const resolved = service.resolve(created.id);
  expect(resolved.status).toBe(ExceptionStatus.RESOLVED);
});
