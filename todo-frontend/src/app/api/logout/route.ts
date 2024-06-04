import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.json(
    {
      message: "logged out successfully",
      statusCode: 200,
    },
    {
      status: 200,
    }
  );

  response.cookies.delete("token");

  return response;
}
