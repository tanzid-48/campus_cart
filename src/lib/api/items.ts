interface CreateItemPayload {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  isNegotiable: boolean;
  category: string;
  condition: string;
  location: string;
  images: string[];
}

interface CreateItemResponse {
  message: string;
  id?: string;
}

export async function createItem(
  payload: CreateItemPayload,
): Promise<{ ok: boolean; data: CreateItemResponse }> {
  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
