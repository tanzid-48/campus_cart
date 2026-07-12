import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "@/lib/auth-session";
import { getDb } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const VALID_STATUSES = ["Available", "Reserved", "Sold"];

export async function PATCH(req: Request, { params }: RouteParams) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid item id" }, { status: 400 });
  }

  const body = await req.json();
  const { status } = body;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { message: "Invalid status value" },
      { status: 400 },
    );
  }

  const db = await getDb();
  const result = await db
    .collection("items")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Status updated by admin" },
    { status: 200 },
  );
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid item id" }, { status: 400 });
  }

  const db = await getDb();
  const result = await db
    .collection("items")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Item deleted by admin" },
    { status: 200 },
  );
}
