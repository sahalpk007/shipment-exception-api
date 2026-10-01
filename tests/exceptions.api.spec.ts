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

test('creates, lists, resolves, and filters shipment exceptions', async ({
    request,
}) => {
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
        status: ExceptionStatus;
    };

    const resolvedResponse = await request.post(
        `/exceptions/${created.id}/resolve`,
    );
    expect(resolvedResponse.ok()).toBeTruthy();

    const filteredResponse = await request.get(
        `/exceptions?status=${ExceptionStatus.RESOLVED}`,
    );
    expect(filteredResponse.ok()).toBeTruthy();
    expect(await filteredResponse.json()).toEqual([
        expect.objectContaining({
            id: created.id,
            status: ExceptionStatus.RESOLVED,
        }),
    ]);
});
