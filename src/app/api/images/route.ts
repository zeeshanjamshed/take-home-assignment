import { NextRequest, NextResponse } from "next/server";
import knex from '../db';

export async function GET (req: NextRequest) {
  try {
    const data = await knex('images')
      .select('images.id', 'images.url', 'images.created_at', 'title')
      .select(knex.raw('COUNT(comments.image_id) AS comments_count'))
      .leftJoin('comments', 'images.id', 'comments.image_id')
      .groupBy('images.id', 'images.url', 'images.created_at')
      .orderBy('images.created_at', 'DESC');

    return NextResponse.json(data);
  } catch (e) { }
  return NextResponse.json(
    { error: "Something went wrong." },
    { status: 500 }
  );
}

export async function POST (req: NextRequest) {
  const { url, title } = await req.json();
  try {
    const insertedIds = await knex('images').insert({ url: url, title: title });
    const [insertedRecord] = await knex('images').select('*').where('id', insertedIds[0]);

    return NextResponse.json(insertedRecord);

  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
