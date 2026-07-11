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
  const items = await db
    .collection("items")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(items, { status: 200 });
}
