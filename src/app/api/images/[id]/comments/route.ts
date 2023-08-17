import { NextRequest, NextResponse } from 'next/server';
import knex from '../../../db';
export async function GET (
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await knex('comments')
      .select('description', 'created_at')
      .where('image_id', '=', id);

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
