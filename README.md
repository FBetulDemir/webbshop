# ToyLandia – Summer Toy Shop

A full-stack e-commerce application for summer toys built with React and Firebase.

**Live demo:** https://fbetuldemir.github.io/webbshop/

---

## Tech Stack

- **React 19** + **Vite** – frontend framework and build tool
- **React Router v7** – client-side routing (HashRouter for GitHub Pages compatibility)
- **Zustand** – shopping cart state management
- **Firebase Firestore** – real-time product database
- **Joi** – form validation
- **GitHub Pages** – deployment

---

## Features

- Product catalogue with real-time data from Firestore
- Search products by name
- Sort by name (A–Z / Z–A) or price (low–high / high–low)
- Shopping cart – add items, adjust quantities, view running total
- Bestseller carousel and promotional section on the home page
- Fully responsive layout (mobile, tablet, desktop)
- Admin panel with full CRUD – add, edit, and delete products

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with a Firestore database

### Installation

```bash
git clone https://github.com/FBetulDemir/webbshop.git
cd webbshop
npm install
```

Create a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Start the development server:

```bash
npm run dev
```

---

## Testing the Admin Panel

The live demo includes a fully functional admin panel.

**URL:** https://fbetuldemir.github.io/webbshop/#/components/adminStartPage/

**Demo credentials**

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `password` |

The admin panel lets you:

- View all products in the database
- Add a new product (name, description, price, image URL, bestseller flag)
- Edit an existing product
- Delete a product

---

## Deployment

```bash
npm run deploy
```

Builds the project and publishes `dist/` to the `gh-pages` branch using the `gh-pages` package.
