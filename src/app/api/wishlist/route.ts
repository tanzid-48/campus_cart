import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "@/lib/auth-session";
import { ObjectId } from "mongodb";

// GET /api/wishlist — get current user's saved items (full item details)
export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const db = await getDb();

  const wishlistEntries = await db
    .collection("wishlist")
    .find({ userId: session.user.id })
    .toArray();

  const itemIds = wishlistEntries.map((entry) => new ObjectId(entry.itemId));

  const items = await db
    .collection("items")
    .find({ _id: { $in: itemIds } })
    .toArray();

  return NextResponse.json({ success: true, items });
}

// POST /api/wishlist — add an item to wishlist
export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { itemId } = body;

  if (!itemId || !ObjectId.isValid(itemId)) {
    return NextResponse.json(
      { success: false, message: "Invalid item id" },
      { status: 400 },
    );
  }

  const db = await getDb();

  // Avoid duplicate wishlist entries for the same user + item
  const existing = await db.collection("wishlist").findOne({
    userId: session.user.id,
    itemId,
  });

  if (existing) {
    return NextResponse.json({ success: true, message: "Already in wishlist" });
  }

  await db.collection("wishlist").insertOne({
    userId: session.user.id,
    itemId,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, message: "Added to wishlist" });
}

// DELETE /api/wishlist — remove an item from wishlist
export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const itemId = searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json(
      { success: false, message: "itemId is required" },
      { status: 400 },
    );
  }

  const db = await getDb();

  await db.collection("wishlist").deleteOne({
    userId: session.user.id,
    itemId,
  });

  return NextResponse.json({ success: true, message: "Removed from wishlist" });
}
