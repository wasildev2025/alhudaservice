import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const secret = req.headers.get('x-revalidate-secret');

    // Basic security to ensure only our Admin panel can trigger this
    if (secret !== process.env.REVALIDATION_SECRET && process.env.NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { tag } = body;

        if (!tag) {
            return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
        }

        revalidateTag(tag, 'max');
        return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}
