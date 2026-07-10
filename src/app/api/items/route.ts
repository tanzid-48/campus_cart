import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-session";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
    } = body;

    const db = await getDb();

    const newItem = {
      title,
      shortDescription,
      fullDescription,
      price,
      isNegotiable,
      category,
      condition,
      images,
      location,
      sellerId: session.user.id,
      status: "Available",
      createdAt: new Date(),
    };

    const result = await db.collection("items").insertOne(newItem);

    return NextResponse.json(
      {
        message: "Item added successfully",
        id: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
