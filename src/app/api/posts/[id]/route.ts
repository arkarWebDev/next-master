import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        next: { revalidate: 60 },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
