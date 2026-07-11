// src/app/api/items/[id]/route.ts

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

export async function PATCH(req: Request, { params }: RouteParams) {
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

    // Owner-only check — same rule as DELETE, a user can only edit
    // their own listing (admins get a separate force-edit path later).
    if (item.sellerId !== session.user.id) {
      return NextResponse.json(
        { message: "You can only edit your own items." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const {
      title,
      shortDescription,
      fullDescription,
      price,
      isNegotiable,
      category,
      condition,
      images,
      location,
      status,
    } = body;

    // Only update fields that were actually sent — lets the client
    // send a partial update (e.g. just { status: "Sold" }) if needed.
    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (shortDescription !== undefined)
      updates.shortDescription = shortDescription;
    if (fullDescription !== undefined)
      updates.fullDescription = fullDescription;
    if (price !== undefined) updates.price = price;
    if (isNegotiable !== undefined) updates.isNegotiable = isNegotiable;
    if (category !== undefined) updates.category = category;
    if (condition !== undefined) updates.condition = condition;
    if (images !== undefined) updates.images = images;
    if (location !== undefined) updates.location = location;
    if (status !== undefined) updates.status = status;

    await db
      .collection("items")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    return NextResponse.json(
      { message: "Item updated successfully" },
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
    // (Admins bypass this in /api/admin/listings/[id] instead.)
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
