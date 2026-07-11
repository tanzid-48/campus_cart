import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "@/lib/auth-session";
import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sellerId = searchParams.get("sellerId");

  if (!sellerId) {
    return NextResponse.json(
      { message: "sellerId query param is required" },
      { status: 400 },
    );
  }

  const db = await getDb();
  const reviews = await db
    .collection("reviews")
    .find({ sellerId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(reviews, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { itemId, sellerId, rating, comment } = body;

    if (!itemId || !sellerId) {
      return NextResponse.json(
        { message: "itemId and sellerId are required" },
        { status: 400 },
      );
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }
    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return NextResponse.json(
        { message: "Comment is required" },
        { status: 400 },
      );
    }

    // A seller can't review themselves.
    if (sellerId === session.user.id) {
      return NextResponse.json(
        { message: "You can't review your own listing." },
        { status: 403 },
      );
    }

    const db = await getDb();

    const newReview = {
      itemId,
      sellerId,
      reviewerId: session.user.id,
      reviewerName: session.user.name,
      rating,
      comment: comment.trim(),
      createdAt: new Date(),
    };

    await db.collection("reviews").insertOne(newReview);

    // Recalculate and store the seller's average rating so item
    // cards / details pages don't need to aggregate reviews every time.
    const sellerReviews = await db
      .collection("reviews")
      .find({ sellerId })
      .toArray();
    const avgRating =
      sellerReviews.reduce((sum, r) => sum + r.rating, 0) /
      sellerReviews.length;

    if (ObjectId.isValid(sellerId)) {
      await db
        .collection("user")
        .updateOne(
          { _id: new ObjectId(sellerId) },
          { $set: { rating: avgRating } },
        );
    }

    return NextResponse.json(
      { message: "Review submitted successfully" },
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
