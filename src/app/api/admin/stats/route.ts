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

  const [totalUsers, totalItems, itemsSold, activeListings, categoryAgg] =
    await Promise.all([
      db.collection("user").countDocuments(),
      db.collection("items").countDocuments(),
      db.collection("items").countDocuments({ status: "Sold" }),
      db.collection("items").countDocuments({ status: "Available" }),
      db
        .collection("items")
        .aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }])
        .toArray(),
    ]);

  const categoryDistribution = categoryAgg.map((c) => ({
    category: c._id as string,
    count: c.count as number,
  }));

  return NextResponse.json(
    {
      totalUsers,
      totalItems,
      itemsSold,
      activeListings,
      categoryDistribution,
    },
    { status: 200 },
  );
}
