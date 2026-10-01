import { expect, test } from '@playwright/test';
import {
  ExceptionStatus,
  ExceptionType,
} from '../src/exceptions/exception.types.js';

test('rejects an invalid exception payload', async ({ request }) => {
  const response = await request.post('/exceptions', {
    data: {
      shipmentId: '',
      type: 'UNKNOWN',
      description: 'short',
      unexpected: true,
    },
  });

  expect(response.status()).toBe(400);
});

test('creates, lists, and resolves a shipment exception', async ({ request }) => {
  const createdResponse = await request.post('/exceptions', {
    data: {
      shipmentId: 'SHIP-1001',
      type: ExceptionType.DELAY,
      description: 'Carrier missed the scheduled collection window.',
    },
  });

  expect(createdResponse.status()).toBe(201);
  const created = (await createdResponse.json()) as {
    id: string;
    shipmentId: string;
    type: ExceptionType;
    status: ExceptionStatus;
  };
  expect(created).toMatchObject({
    shipmentId: 'SHIP-1001',
    type: ExceptionType.DELAY,
    status: ExceptionStatus.OPEN,
  });
    
  const listResponse = await request.get('/exceptions');
  expect(listResponse.ok()).toBeTruthy();
  expect(await listResponse.json()).toContainEqual(
    expect.objectContaining({ id: created.id }),
  );

  const resolvedResponse = await request.post(
    `/exceptions/${created.id}/resolve`,
  );
  expect(resolvedResponse.ok()).toBeTruthy();
  expect(await resolvedResponse.json()).toMatchObject({
    id: created.id,
    status: ExceptionStatus.RESOLVED,
  });

});
