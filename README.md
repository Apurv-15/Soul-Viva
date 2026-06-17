# Soul Viva — Luxury Glycerin Bathing Bars Catalog

Soul Viva is an immersive, high-end digital catalog for a premium range of transparent glycerin bathing bars. Built with state-of-the-art web design aesthetics, it features fluid transitions, 3D parallax effects, and cinematic video integration to deliver an exceptional product showcase.

---

## ✨ Features

- **Cinematic Collection Showcase:** Modern grid layout displaying each premium variant (Sea Minerals & Menthol, Waterlily & Pear, Black Currant & Lavender, Shea Butter & Honey, Cherry Blossom & Strawberry, and Mandarin & Peach).
- **Interactive 3D Parallax Hero:** Immersive 3D depth movement response on mouse hover.
- **High-Fidelity Product Details:** Immersive modal views featuring auto-playing product videos, high-resolution multi-angle image galleries, complete INCI ingredient profiles, and formulation specifications.
- **Tactile 3D Cards:** Micro-interactions and tilt effects on interactive ingredient showcases.
- **Seamless Infinite Scroller:** Bottom "Discover Our Collection" gallery featuring smooth drift autoscrolling.
- **B2B consultation & Inquiry Flow:** Fully integrated custom consultation forms for trade buyers.
- **Admin Analytics Dashboard:** Built-in dashboard to monitor catalog performance.

---

## 🛠️ Technology Stack

- **Core:** [Next.js](https://nextjs.org/) (React 19, TypeScript)
- **Styling:** CSS Variables and [Tailwind CSS](https://tailwindcss.com/) for fluid layouts and curated luxury color palettes
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/) (`motion/react`) for smooth spring transitions and modal dynamics
  - [GSAP](https://gsap.com/) (ScrollTrigger & ScrollSmoother) for premium page-level kinetic smoothing
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📁 Directory Structure

```text
├── app/
│   ├── layout.tsx         # Root layout configuration
│   └── page.tsx           # Main application entry point and screen navigation
├── src/
│   ├── components/        # Reusable UI components (Header, Modals, 3D elements)
│   ├── data.ts            # Detailed product catalogs, commitments, and brand stories
│   ├── types.ts           # Core TypeScript type definitions
│   └── firebase.ts        # Optional database integration entrypoint
└── public/
    ├── Images/            # Variant key visual background images
    ├── Video/             # Cinematic loop videos for variants
    ├── Mandarin/          # Product assets for Mandarin & Peach
    ├── Sea Minerals/      # Product assets for Sea Minerals & Menthol
    ├── Strawberry/        # Product assets for Cherry Blossom & Strawberry
    └── Waterlily and Pear/# Product assets for Waterlily & Pear
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Apurv-15/Soul-Vita.git
   cd soul-vita
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Set any required values (such as database credentials or API keys) inside your newly created `.env.local` file.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To compile the application for production deployment:

```bash
npm run build
npm start
```
