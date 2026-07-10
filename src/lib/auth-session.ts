
import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Gets the current session on the server (Server Components, Route Handlers).
 * Returns null if not logged in — does NOT redirect by itself.
 */
export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Use inside a protected Server Component page (e.g. /items/add, /wishlist).
 * Redirects to /login if there's no session.
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

/**
 * Use inside admin-only pages (/admin, /admin/listings, /admin/users).
 * Redirects non-admins to the home page, not just non-logged-in users.
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "admin") {
    redirect("/");
  }
  return session;
}
