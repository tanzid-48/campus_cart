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

interface ApiMessageResponse {
  message: string;
  id?: string;
}

export async function createItem(
  payload: CreateItemPayload,
): Promise<{ ok: boolean; data: ApiMessageResponse }> {
  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function deleteItem(
  itemId: string,
): Promise<{ ok: boolean; data: ApiMessageResponse }> {
  const res = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function updateItem(
  itemId: string,
  payload: Partial<CreateItemPayload> & { status?: string },
): Promise<{ ok: boolean; data: ApiMessageResponse }> {
  const res = await fetch(`/api/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
