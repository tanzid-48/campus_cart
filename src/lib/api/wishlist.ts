interface WishlistApiResponse {
  success: boolean;
  message?: string;
  items?: { _id: string }[];
}

// Fetch the current user's wishlist items
export async function fetchWishlist(): Promise<WishlistApiResponse> {
  const res = await fetch("/api/wishlist");
  return res.json();
}

// Add an item to the wishlist
export async function addToWishlist(
  itemId: string,
): Promise<WishlistApiResponse> {
  const res = await fetch("/api/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });
  return res.json();
}

// Remove an item from the wishlist
export async function removeFromWishlist(
  itemId: string,
): Promise<WishlistApiResponse> {
  const res = await fetch(`/api/wishlist?itemId=${itemId}`, {
    method: "DELETE",
  });
  return res.json();
}
