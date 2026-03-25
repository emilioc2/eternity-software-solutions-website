import { vi, describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock next/cache before importing the route handler
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mock next-sanity/webhook before importing the route handler
vi.mock('next-sanity/webhook', () => ({
  parseBody: vi.fn(),
}));

import { revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';
import { POST } from '../../app/api/revalidate/route';

const mockParseBody = parseBody as ReturnType<typeof vi.fn>;
const mockRevalidatePath = revalidatePath as ReturnType<typeof vi.fn>;

function makeRequest(): NextRequest {
  return new NextRequest('https://example.com/api/revalidate', {
    method: 'POST',
    body: JSON.stringify({ _type: 'service' }),
    headers: { 'Content-Type': 'application/json' },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/revalidate', () => {
  it('calls revalidatePath("/") and returns 200 on valid signature', async () => {
    mockParseBody.mockResolvedValueOnce({ isValidSignature: true, body: { _type: 'service' } });

    const res = await POST(makeRequest());

    expect(mockRevalidatePath).toHaveBeenCalledWith('/');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Revalidated');
  });

  it('returns 401 and does not call revalidatePath on invalid signature', async () => {
    mockParseBody.mockResolvedValueOnce({ isValidSignature: false, body: null });

    const res = await POST(makeRequest());

    expect(mockRevalidatePath).not.toHaveBeenCalled();
    expect(res.status).toBe(401);
    expect(await res.text()).toBe('Invalid signature');
  });

  it('passes SANITY_WEBHOOK_SECRET env var to parseBody', async () => {
    process.env.SANITY_WEBHOOK_SECRET = 'test-secret';
    mockParseBody.mockResolvedValueOnce({ isValidSignature: true, body: { _type: 'project' } });

    const req = makeRequest();
    await POST(req);

    expect(mockParseBody).toHaveBeenCalledWith(req, 'test-secret');

    delete process.env.SANITY_WEBHOOK_SECRET;
  });

  it('passes undefined secret when SANITY_WEBHOOK_SECRET is not set', async () => {
    delete process.env.SANITY_WEBHOOK_SECRET;
    mockParseBody.mockResolvedValueOnce({ isValidSignature: false, body: null });

    const req = makeRequest();
    await POST(req);

    expect(mockParseBody).toHaveBeenCalledWith(req, undefined);
  });
});
