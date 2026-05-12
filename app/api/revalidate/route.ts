import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = body.secret as string | undefined;

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: "Nieprawidłowy secret" },
        { status: 401 },
      );
    }

    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      message: "Cache strony został odświeżony",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { message: "Nieprawidłowe żądanie" },
      { status: 400 },
    );
  }
}
