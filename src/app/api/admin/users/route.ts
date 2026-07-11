import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-session";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const db = await getDb();
  const users = await db
    .collection("user")
    .find(
      {},
      {
        projection: {
          name: 1,
          email: 1,
          university: 1,
          role: 1,
          rating: 1,
          createdAt: 1,
        },
      },
    )
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(users, { status: 200 });
}
