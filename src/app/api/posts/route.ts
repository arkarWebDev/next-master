import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      next: { revalidate: 60 },
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
