"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingBag, Heart, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";
import { toast } from "sonner";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;
  const userRole = session?.user?.role as "user" | "admin" | undefined;
  const userName = session?.user?.name ?? "";

  const loggedOutLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "How it works", href: "/how-it-works" },
  ];

  const loggedInLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Add Item", href: "/items/add" },
    { name: "Manage Items", href: "/items/manage" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "How it works", href: "/how-it-works" },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-teal-700 dark:text-teal-400"
          >
            <ShoppingBag size={24} />
            CampusCart
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-teal-700 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {userRole === "admin" && isLoggedIn && (
              <Link
                href="/admin"
                className={`font-medium transition-colors ${
                  isActive("/admin")
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400"
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right side (theme toggle + auth buttons / profile dropdown) */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {isPending ? (
              <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
            ) : isLoggedIn ? (
              <>
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      isActive("/wishlist")
                        ? "text-red-500"
                        : "text-gray-600 dark:text-gray-400 hover:text-red-500"
                    }`}
                  />
                </Link>
                <ProfileDropdown
                  userName={userName}
                  userRole={userRole ?? "user"}
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-teal-700 dark:text-teal-400 font-medium hover:bg-teal-50 dark:hover:bg-teal-950 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium py-2 ${
                  isActive(link.href)
                    ? "text-teal-700 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {userRole === "admin" && isLoggedIn && (
              <Link
                href="/admin"
                className={`font-medium py-2 ${
                  isActive("/admin")
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-amber-600 dark:text-amber-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-700 dark:text-gray-300 font-medium py-2"
                  >
                    Profile
                  </Link>
                  <Link
                    href={userRole === "admin" ? "/admin" : "/items/manage"}
                    className="text-gray-700 dark:text-gray-300 font-medium py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      setIsMenuOpen(false);
                      await authClient.signOut();
                      toast.success("Logged out successfully");
                      router.push("/");
                      router.refresh();
                    }}
                    className="flex items-center gap-2 py-2 text-left font-medium text-red-600 dark:text-red-400"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-teal-700 dark:text-teal-400 font-medium text-center border border-teal-700 dark:border-teal-400"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-teal-700 text-white font-medium text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
