import { NextRequest, NextResponse } from "next/server";
import knex from '../db';


export async function POST (req: NextRequest) {
  const { description, image_id } = await req.json();

  try {
    const commentId = await knex('comments').insert({
      image_id: image_id,
      description: description,
    });
    const [insertedRecord] = await knex('comments').select('*').where('id', commentId[0]);

    return NextResponse.json(insertedRecord);

  } catch (err) {
    return NextResponse.json({ error: "something went wrong" });
  }
}
