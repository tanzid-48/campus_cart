import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "@/lib/auth-session";
import { ObjectId } from "mongodb";

// PATCH /api/profile — update the current user's own profile
export async function PATCH(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { name, phone, university, avatarUrl } = body;

  const updates: Record<string, string> = {};
  if (typeof name === "string" && name.trim()) updates.name = name.trim();
  if (typeof phone === "string") updates.phone = phone.trim();
  if (typeof university === "string") updates.university = university.trim();
  if (typeof avatarUrl === "string") updates.avatarUrl = avatarUrl.trim();

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { success: false, message: "No valid fields to update" },
      { status: 400 },
    );
  }

  const db = await getDb();

  await db
    .collection("user")
    .updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { ...updates, updatedAt: new Date() } },
    );

  return NextResponse.json({
    success: true,
    message: "Profile updated successfully",
  });
}
