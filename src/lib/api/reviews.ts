interface CreateReviewPayload {
  itemId: string;
  sellerId: string;
  rating: number;
  comment: string;
}

interface ApiMessageResponse {
  message: string;
}

export async function createReview(
  payload: CreateReviewPayload,
): Promise<{ ok: boolean; data: ApiMessageResponse }> {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
