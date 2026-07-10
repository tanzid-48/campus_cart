# CampusCart — Final Combined Project Plan

### Secondhand Marketplace for Students (Books, Electronics, Cycle, Hostel Essentials)

---

## 1. Overview

**Project name:** CampusCart
**Type:** Campus-based secondhand marketplace — students within a campus (PUB, scalable to more universities later) can list, browse, and buy/sell used books, electronics, cycles, furniture, and stationery safely within their own campus community.
**Core idea:** Every semester students need to sell old items and buy used ones cheap — CampusCart gives them a dedicated, trusted platform instead of random Facebook group posts.

---

## 2. Tech Stack (Final)

**Single Next.js project — frontend + backend together, no separate Express server.**

- Next.js 15 (App Router) + TypeScript (strict mode)
- Tailwind CSS
- BetterAuth — session/auth management with `role` field (`user` | `admin`), same pattern as your previous projects (LifeVault, IdeaVault)
- MongoDB Atlas — **native driver only, no Mongoose**
- Recharts (category-wise stats chart)
- Framer Motion (card hover, transitions)
- Sonner (toast notifications)
- Lucide React (icons)

### Folder Structure

```
campuscart/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── explore/page.tsx                → listing/search/filter page
│   │   ├── items/
│   │   │   ├── [id]/page.tsx
│   │   │   ├── add/page.tsx
│   │   │   └── manage/page.tsx
│   │   ├── wishlist/page.tsx
│   │   ├── profile/[id]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   ├── safety-tips/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── listings/page.tsx
│   │   │   └── users/page.tsx
│   │   └── api/
│   │       ├── auth/[...all]/route.ts     → BetterAuth catch-all handler
│   │       ├── items/
│   │       │   ├── route.ts               → GET (list+filter+sort+pagination), POST (create)
│   │       │   └── [id]/route.ts          → GET, PATCH, DELETE
│   │       ├── wishlist/route.ts          → GET, POST, DELETE
│   │       ├── reviews/route.ts           → GET, POST
│   │       ├── users/[id]/route.ts        → GET seller profile
│   │       └── admin/
│   │           ├── stats/route.ts
│   │           ├── listings/route.ts
│   │           └── users/route.ts
│   ├── components/
│   │   ├── layout/ (Navbar.tsx, Footer.tsx)
│   │   ├── home/ (Hero, CategoryGrid, TrendingListings, HowItWorks, StatsSection, Testimonials, FAQ, Newsletter, CTASection)
│   │   ├── items/ (ItemCard, ItemGrid, ItemSkeleton, FilterSidebar, SortDropdown, SearchBar, ContactSellerButton)
│   │   ├── admin/ (StatsCards, ListingsTable, UsersTable)
│   │   ├── forms/ (AddItemForm, LoginForm, RegisterForm)
│   │   ├── charts/ (CategoryChart.tsx)
│   │   └── ui/ (Badge, Button, RatingStars, EmptyState)
│   ├── lib/
│   │   ├── db.ts              → MongoDB Atlas connection (native driver)
│   │   ├── auth.ts             → BetterAuth config
│   │   └── utils.ts
│   └── types/
│       └── index.ts            → shared TypeScript interfaces
├── scripts/
│   └── seed.ts                 → seeds demo user, demo admin, sample items
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── next.config.ts
```

One `package.json`, one `tsconfig.json`, one Vercel deployment. No separate backend folder/project.

---

## 3. Environment Variables (`.env.local`)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xhm3y2q.mongodb.net/campus_cart_db?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
```

- **Database name: `campus_cart_db`** (confirmed, connected, verified working)
- Server-side only (never exposed to frontend)
- Frontend-visible variables must be prefixed `NEXT_PUBLIC_`
- `.env.local` must be in `.gitignore` — never commit real credentials

---

## 4. Key npm Packages

```
next, react, react-dom, typescript, tailwindcss
mongodb                          → native driver (NO mongoose)
better-auth
recharts, framer-motion, sonner, lucide-react
@types/node, @types/react, tsx (dev — tsx দিয়ে scripts/seed.ts রান হবে: npx tsx scripts/seed.ts)
```

`serverExternalPackages: ["mongodb"]` লাগবে `next.config.ts` তে — কারণ native MongoDB driver Edge runtime এর জন্য bundle হয় না, এটা ছাড়া build fail করতে পারে:

```typescript
const nextConfig = {
  serverExternalPackages: ["mongodb"],
};
```

`tsconfig.json` এ `"strict": true` রাখতে হবে (create-next-app এ TypeScript সিলেক্ট করলে default already থাকে) — এটা null/undefined bug কম্পাইল টাইমেই ধরিয়ে দেয়।

---

## 5. Design System

- Primary: Deep Teal `#0F766E`
- Secondary: Warm Amber `#F59E0B`
- Accent: Soft Coral `#F87171`
- Neutral: Slate gray + white
- Max 3 primary colors + neutral — consistent card size/border-radius throughout

---

## 6. MongoDB Collections (Native Driver — No Mongoose, DB: `campus_cart_db`)

No schema-enforcement library — TypeScript interfaces define the shape; validation happens manually in each API route handler before insert/update.

### `user` (BetterAuth-managed, with additionalFields)

```typescript
interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  role: "user" | "admin"; // additionalField — must be schema-declared in BetterAuth config
  university?: string; // e.g. "PUB" — kept for future multi-campus scalability
  rating?: number; // average seller rating
  createdAt: Date;
}
```

Note: BetterAuth also manages its own auth collections (`session`, `account`, `verification`) alongside `user` — `role`, `university`, `rating` are custom `additionalFields` added to the BetterAuth user record.

### `items`

```typescript
interface ItemDocument {
  _id: ObjectId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  isNegotiable: boolean;
  category:
    | "Books"
    | "Electronics"
    | "Furniture"
    | "Cycle"
    | "Stationery"
    | "Others";
  condition: "New" | "Like New" | "Used";
  status: "Available" | "Reserved" | "Sold";
  images: string[];
  location: string; // hall/area within campus
  university?: string;
  sellerId: ObjectId; // ref user._id
  createdAt: Date;
}
```

### `wishlist`

```typescript
interface WishlistDocument {
  _id: ObjectId;
  userId: ObjectId;
  itemId: ObjectId;
  createdAt: Date;
}
```

### `reviews`

```typescript
interface ReviewDocument {
  _id: ObjectId;
  itemId: ObjectId;
  sellerId: ObjectId;
  reviewerId: ObjectId;
  reviewerName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}
```

**Indexes to create manually (native driver, in `lib/db.ts` or a setup script):**

```typescript
db.collection("items").createIndex({ category: 1 });
db.collection("items").createIndex({ university: 1 });
db.collection("items").createIndex({ status: 1 });
db.collection("items").createIndex({ createdAt: -1 });
db.collection("user").createIndex({ email: 1 }, { unique: true });
```

---

## 7. Auth Flow (BetterAuth)

1. `lib/auth.ts` — BetterAuth config with `additionalFields: { role, university, rating }` (declared explicitly, or fields silently drop — known gotcha)
2. `app/api/auth/[...all]/route.ts` — `toNextJsHandler` catch-all handler (register/login/session/logout)
3. Register/Login pages call BetterAuth client methods
4. Session check — client (`useSession()`) and server (`auth.api.getSession({ headers: await headers() })`)
5. Protected pages (`/items/add`, `/items/manage`, `/wishlist`, `/admin/*`) — server-side session check, redirect to `/login` if no session; redirect to `/` if admin route but `role !== "admin"`
6. **Demo login button** — auto-fills seeded demo credentials on the login form (one regular user, one admin)
7. **Admin demo account** — a second seeded account with `role: "admin"`, used for the admin demo credential required at submission
8. `proxy.js` instead of `middleware.js` if on Next.js 16 (known pattern)

---

## 8. API Endpoint Summary

| Method | Route                      | Access            | Purpose                                                    |
| ------ | -------------------------- | ----------------- | ---------------------------------------------------------- |
| POST   | `/api/items`               | Protected         | Create item                                                |
| GET    | `/api/items`               | Public            | List items (query: category, price, condition, sort, page) |
| GET    | `/api/items/[id]`          | Public            | Item details                                               |
| PATCH  | `/api/items/[id]`          | Protected (owner) | Update status/details                                      |
| DELETE | `/api/items/[id]`          | Protected (owner) | Delete own item                                            |
| GET    | `/api/wishlist`            | Protected         | Get saved items                                            |
| POST   | `/api/wishlist`            | Protected         | Add to wishlist                                            |
| DELETE | `/api/wishlist`            | Protected         | Remove from wishlist                                       |
| GET    | `/api/reviews?itemId=`     | Public            | Get reviews                                                |
| POST   | `/api/reviews`             | Protected         | Add review                                                 |
| GET    | `/api/users/[id]`          | Public            | Seller profile info                                        |
| GET    | `/api/admin/stats`         | Admin only        | Dashboard stats                                            |
| GET    | `/api/admin/listings`      | Admin only        | All listings                                               |
| DELETE | `/api/admin/listings/[id]` | Admin only        | Force delete any item                                      |
| GET    | `/api/admin/users`         | Admin only        | All registered users                                       |

---

## 9. Page Feature Checklist

| Page                                         | Key Features                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Landing (`/`)                                | Navbar, Hero (60-70% height), 7+ sections, Footer                                           |
| Explore (`/explore`)                         | Search, filter (category + price/condition), sort, pagination, skeleton loader              |
| Item Details (`/items/[id]`)                 | Gallery, description, specs, seller card, Contact Seller button, reviews, related items     |
| Login/Register                               | Validation, demo login button, error handling                                               |
| Add Item (`/items/add`)                      | Protected, full form (title, category, condition, price, description, image URLs, location) |
| Manage Items (`/items/manage`)               | Table/grid, View/Delete/Mark status actions                                                 |
| Wishlist (`/wishlist`)                       | Saved items grid, remove option                                                             |
| About / Contact / How-it-works / Safety-tips | Static informational pages (satisfies "min 2 extra pages")                                  |
| Admin Dashboard (`/admin`)                   | Stats cards, category chart, listings table (delete), users table                           |

---

## 10. Landing Page Sections (9 total)

1. Hero — search bar + CTA
2. Category Showcase (Books/Electronics/Cycle/Furniture/Stationery)
3. Trending/Featured Listings
4. How It Works (Post → Connect → Deal)
5. Stats (total listings, active sellers, items sold)
6. Testimonials
7. FAQ
8. Newsletter signup
9. Final CTA

---

## 11. Card Design Rules

- Image, title, price, condition badge (color-coded), status badge, seller rating, location, wishlist heart icon, "View Details" button
- Same height/width/border-radius across all cards
- 4 cards per row on desktop, responsive down to 1 column mobile
- Skeleton loader while fetching

---

## 12. Admin Panel Details

- Route protection: valid session check + `role === "admin"` check (both, not just login status)
- Seed one admin account via `scripts/seed.ts` for demo credential submission
- Dashboard shows: total users, total items, items sold vs available, category-wise distribution (Recharts)
- Listings table: view/delete any item (moderation)
- Users table: name, email, university, join date

---

## 13. Suggested Build Order (Phases)

1. ✅ Project setup — Next.js + TS + Tailwind + MongoDB Atlas connection (native driver) — **done, connection verified**
2. ✅ Navbar (logged-in/logged-out states) — **done**
3. BetterAuth setup — register/login/session + role additionalField + demo login button
4. Item CRUD API + Add Item / Manage Items pages
5. Explore page — search/filter/sort/pagination/skeleton
6. Item details page — gallery/seller card/reviews/related items
7. Wishlist feature
8. Landing page — all 9 sections
9. Admin panel — dashboard/stats/chart/moderation
10. About/Contact/How-it-works/Safety-tips pages + Footer
11. Seed script + responsive polish + final testing + Vercel deployment

---

## 14. Notes / Reminders

- No mongoose — all DB operations through native `mongodb` driver, validation handled manually in API route handlers
- No placeholder/lorem ipsum — use real category names and realistic sample data
- Run `scripts/seed.ts` once against MongoDB Atlas so the live site isn't empty for reviewers
- BetterAuth `additionalFields` (role, university, rating) must be explicitly declared in config or they silently drop
- Keep card size/border-radius consistent across all listing views
- Use `university` as a field everywhere (not hardcoded) for future multi-campus scalability
- **Never commit `.env.local` or share real database credentials** — rotate immediately if accidentally exposed

---

## 15. Final Submission Checklist

- [ ] Live Website URL (Vercel)
- [ ] GitHub Repository Link (single repo — frontend + backend together)
- [ ] Demo credentials — **User** (email/password, seeded)
- [ ] Demo credentials — **Admin** (email/password, seeded)
- [ ] Demo login auto-fill button working on `/login`
- [ ] README — overview, tech stack, `.env.local` setup instructions, demo credentials, live link
