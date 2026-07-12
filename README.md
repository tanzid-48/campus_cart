<div align="center">

<img src="https://images.unsplash.com/photo-1763872011479-aa293bf083a8?w=1200&h=380&fit=crop&q=80" alt="CampusCart Banner" width="100%" />

<br/><br/>

# 🛒 CampusCart

### A secondhand marketplace built exclusively for students

**Buy and sell used books, electronics, cycles, furniture, and stationery**
**safely within your own campus community.**

<br/>

[![Live Site](https://img.shields.io/badge/Live%20Site-0F766E?style=for-the-badge&logo=vercel&logoColor=white)](https://campus-cart-seven-zeta.vercel.app)
[![Repository](https://img.shields.io/badge/Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tanzid-48/campus_cart)

<br/>

![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![BetterAuth](https://img.shields.io/badge/BetterAuth-0F766E?style=flat-square)

</div>

---

## 📖 About

Every semester, students end up with books, gadgets, and furniture they no longer need — while other students are actively looking for exactly those items at a fair price. CampusCart replaces scattered, untrustworthy Facebook group posts with a dedicated, polished platform built specifically for campus life: verified listings, seller ratings, safe on-campus meetups, and a clean buying/selling experience end to end.

---

## ✨ Features

### For Everyone

- 🏠 **Landing page** with animated hero (background image slideshow), category showcase, trending listings, how-it-works, live stats, testimonials, FAQ, and newsletter signup
- 🔍 **Explore/Search page** — full-text search, filter by category/price/condition, sort by price or recency, pagination, skeleton loading states
- 📄 **Item details page** — image gallery, full description, specifications, seller card with rating, reviews, related items, and direct contact (WhatsApp/Call/Email)
- 🌗 **Dark/Light theme** toggle across the entire app
- 📱 Fully responsive — mobile, tablet, and desktop

### For Logged-in Users

- 🔐 **Authentication** — email/password and Google sign-in via BetterAuth, with a one-click Demo Login
- ➕ **Add Item** — post listings with images, pricing, condition, and category
- 📋 **Manage Items** — view, update status (Available/Reserved/Sold), and delete your own listings
- ❤️ **Wishlist** — save items for later with a single click
- 👤 **Profile** — edit your name, phone, and university; view your own activity stats
- 🌐 **Public seller profiles** — see any seller's active listings, rating, and reviews

### For Admins

- 📊 **Admin dashboard** — real-time stats, category distribution chart, 14-day listing trend, and week-over-week growth indicators
- 🗂️ **Listings management** — view and moderate/delete any listing across the platform
- 👥 **User management** — view all registered students

---

## 🛠️ Tech Stack

**Frontend**

- [Next.js 15](https://nextjs.org/) (App Router) + TypeScript (strict mode)
- Tailwind CSS
- [Framer Motion](https://www.framer.com/motion/) — scroll animations, transitions
- [Recharts](https://recharts.org/) — dashboard charts
- Lucide React (icons) · Sonner (toasts)

**Backend**

- Next.js API Routes (single project — no separate backend server)
- MongoDB Atlas — native driver (no ORM/Mongoose)
- [BetterAuth](https://www.better-auth.com/) — authentication & role-based session management

**Deployment**

- Vercel (frontend + backend), MongoDB Atlas (database)

---

## 🔑 Demo Credentials

Use the **"Use a demo account"** button on the [login page](https://campus-cart-seven-zeta.vercel.app/login) to auto-fill credentials, or enter them manually:

| Role         | Name                 | Email                 | Password       |
| ------------ | -------------------- | --------------------- | -------------- |
| 👤 **User**  | Jon Snow             | `demoUser@gmail.com`  | `DemoUser123`  |
| 🛡️ **Admin** | Captain Jack Sparrow | `demoAdmin@gmail.com` | `DemoAdmin123` |

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (free tier is enough)

### 1. Clone the repository

```bash
git clone https://github.com/tanzid-48/campus_cart.git
cd campus_cart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/campus_cart_db?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ Make sure your MongoDB Atlas cluster allows connections from your IP (or `0.0.0.0/0` for development), and that `.env.local` is never committed.

### 4. Seed the database (optional but recommended)

Populates a demo user, demo admin, and a handful of sample listings:

```bash
npm run seed
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
campus_cart/
├── src/
│   ├── app/              # Pages + API routes (App Router)
│   │   ├── api/           # Auth, items, wishlist, admin endpoints
│   │   ├── admin/         # Admin dashboard, listings, users
│   │   ├── items/         # Item details, add, manage
│   │   ├── profile/       # Own profile + public seller profiles
│   │   └── ...             # explore, wishlist, about, contact, etc.
│   ├── components/        # Reusable UI components (by feature)
│   ├── lib/                # DB connection, auth config, API helpers
│   └── types/              # Shared TypeScript interfaces
├── scripts/
│   └── seed.ts             # Database seeding script
└── plan.md                 # Full project architecture & build plan
```

---

## 🎨 Design System

- **Primary:** Deep Teal `#0F766E`
- **Secondary:** Warm Amber `#F59E0B`
- **Accent:** Soft Coral `#F87171`
- Consistent card sizing, border radius, and spacing throughout
- Framer Motion entrance/scroll animations applied consistently across all sections

---

## 👨‍💻 Author

**Tanzid Mondol**
Full Stack Developer <br>
B.Sc. CSE, Pundra University of Science & Technology <br>
[GitHub](https://github.com/tanzid-48) · [LinkedIn](https://linkedin.com/in/tanzidmondol) · [Email](mdtanzid.525@gmail.com)

---

## 📝 License

Built as an academic submission for a Full Stack TypeScript course project.
