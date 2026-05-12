<<<<<<< HEAD
# ShopEasy - E-Commerce Application

A complete, production-style full-stack MERN e-commerce application built as an internship project / portfolio showcase.

## Tech Stack
- **Frontend:** React, Vite, React Router DOM, Vanilla CSS (Modern Design Tokens)
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT) & HTTP-only cookies

## Features
- Fully responsive, modern, dynamic UI.
- User Authentication (Login, Register).
- Display all products.
- Single product details view.
- Add to Cart, Remove from Cart, Update Quantity.
- Shipping details capture.
- Complete Order Checkout flow.
- Admin & User roles (database level).

## Getting Started

### Prerequisites
- Node.js installed (v18+ recommended)
- Local MongoDB running on port 27017 or a MongoDB Atlas URI.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/shopeasy.git
   cd shopeasy
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `/backend` folder:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=supersecret123
   ```
   *Seed the database with sample data:*
   ```bash
   npm run data:import
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application Locally
You need two terminals to run the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

## Design Decisions
- **Vanilla CSS:** I used modern Vanilla CSS with CSS variables (design tokens) for maximum flexibility and to demonstrate an understanding of core CSS concepts without relying on frameworks like Tailwind or Bootstrap.
- **Context API vs Redux:** Opted for the React Context API (`AuthContext`, `CartContext`) to keep state management lightweight, beginner-friendly, and to avoid boilerplate.
- **HTTP-Only Cookies:** Used HTTP-only cookies for JWT storage instead of Local Storage to enhance security against XSS attacks.
=======
# CodeAlpha_ShopEasy_e-commerce
>>>>>>> ebb30d7a58d68b5d25e348908a16197c032fd27d
