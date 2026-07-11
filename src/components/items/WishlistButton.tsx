"use client";

import { useState, useEffect, useTransition } from "react";
import { Heart } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";

interface WishlistButtonProps {
  itemId: string;
}

export default function WishlistButton({ itemId }: WishlistButtonProps) {
  const { data: session } = authClient.useSession();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!session?.user) return;

    fetchWishlist().then((data) => {
      if (data.success && data.items) {
        const saved = data.items.some((item) => item._id === itemId);
        setIsSaved(saved);
      }
    });
  }, [itemId, session?.user]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigating if this is inside a <Link>
    e.stopPropagation();

    if (!session?.user) {
      toast.error("Please login to save items");
      return;
    }

    startTransition(async () => {
      if (isSaved) {
        const data = await removeFromWishlist(itemId);
        if (data.success) {
          setIsSaved(false);
          toast.success("Removed from wishlist");
        }
      } else {
        const data = await addToWishlist(itemId);
        if (data.success) {
          setIsSaved(true);
          toast.success("Added to wishlist");
        }
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
      className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white disabled:opacity-60 dark:bg-slate-900/90 dark:hover:bg-slate-900"
    >
      <Heart
        size={16}
        className={
          isSaved
            ? "fill-red-500 text-red-500"
            : "text-slate-500 dark:text-slate-400"
        }
      />
    </button>
  );
}
