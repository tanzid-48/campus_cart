"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CATEGORIES = [
  "Books",
  "Electronics",
  "Furniture",
  "Cycle",
  "Stationery",
  "Others",
] as const;

const CONDITIONS = ["New", "Like New", "Used"] as const;

export default function AddItemForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>("Books");
  const [condition, setCondition] =
    useState<(typeof CONDITIONS)[number]>("Used");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Client-side validation — mirrors the checks the API route
    // does again on the server (never trust the client alone).
    if (!title.trim() || title.trim().length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    if (!shortDescription.trim()) {
      setError("Short description is required.");
      return;
    }
    if (!fullDescription.trim()) {
      setError("Full description is required.");
      return;
    }
    const numericPrice = Number(price);
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      setError("Please enter a valid price.");
      return;
    }
    if (!location.trim()) {
      setError("Location is required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          shortDescription: shortDescription.trim(),
          fullDescription: fullDescription.trim(),
          price: numericPrice,
          isNegotiable,
          category,
          condition,
          location: location.trim(),
          images: imageUrl.trim() ? [imageUrl.trim()] : [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not add the item. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Item listed successfully!");
      router.push("/items/manage");
      router.refresh();
    } catch {
      setError("Something went wrong. Please check your connection.");
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-slate-200  bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8"
    >
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="e.g. Calculus: Early Transcendentals (3rd Edition)"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Short description
        </label>
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="One line — shown on the item card"
          maxLength={100}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Full description
        </label>
        <textarea
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="Condition details, reason for selling, anything a buyer should know"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as (typeof CATEGORIES)[number])
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Condition
          </label>
          <select
            value={condition}
            onChange={(e) =>
              setCondition(e.target.value as (typeof CONDITIONS)[number])
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Price (৳)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="350"
            min={1}
          />
        </div>

        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <input
              type="checkbox"
              checked={isNegotiable}
              onChange={(e) => setIsNegotiable(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
            />
            Price negotiable
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="e.g. Hall-3, PUB"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Image URL{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg hover:bg-[#F59E0B] bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition-colors  disabled:opacity-60"
      >
        {isLoading ? "Submitting..." : "Submit item"}
      </button>
    </form>
  );
}
