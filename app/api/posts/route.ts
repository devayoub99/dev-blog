import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, context) {
  const url = request.nextUrl;
  return Response.json({ message: "Hello world!", url });
}
