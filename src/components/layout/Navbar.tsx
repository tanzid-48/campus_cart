"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: "user" | "admin";
}

export default function Navbar({
  isLoggedIn = false,
  userRole = "user",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

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
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-teal-700"
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
                    ? "text-teal-700"
                    : "text-gray-700 hover:text-teal-700"
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
                    ? "text-amber-700"
                    : "text-amber-600 hover:text-amber-700"
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right side (auth buttons / profile) */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      isActive("/wishlist")
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </Link>
                <Link href="/profile" aria-label="Profile">
                  <User
                    size={20}
                    className={`transition-colors ${
                      isActive("/profile")
                        ? "text-teal-700"
                        : "text-gray-600 hover:text-teal-700"
                    }`}
                  />
                </Link>
                <button className="px-4 py-2 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-teal-700 font-medium hover:bg-teal-50 transition-colors"
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

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium py-2 ${
                  isActive(link.href) ? "text-teal-700" : "text-gray-700"
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
                  isActive("/admin") ? "text-amber-700" : "text-amber-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              {isLoggedIn ? (
                <button className="px-4 py-2 rounded-lg bg-teal-700 text-white font-medium">
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-teal-700 font-medium text-center border border-teal-700"
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
