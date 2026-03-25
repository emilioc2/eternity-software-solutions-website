import { type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

interface WebhookBody {
  _type: string;
}

export async function POST(req: NextRequest): Promise<Response> {
  const { isValidSignature } = await parseBody<WebhookBody>(
    req,
    process.env.SANITY_WEBHOOK_SECRET
  );

  if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 });
  }

  revalidatePath('/');
  return new Response('Revalidated', { status: 200 });
}
