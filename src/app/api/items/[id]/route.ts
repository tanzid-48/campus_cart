import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "@/lib/auth-session";
import { getDb } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid item id" }, { status: 400 });
  }

  const db = await getDb();
  const item = await db.collection("items").findOne({ _id: new ObjectId(id) });

  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item, { status: 200 });
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid item id" }, { status: 400 });
    }

    const db = await getDb();
    const item = await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Owner-only check — a logged-in user can only delete their own item.
    if (item.sellerId !== session.user.id) {
      return NextResponse.json(
        { message: "You can only delete your own items." },
        { status: 403 },
      );
    }

    await db.collection("items").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
