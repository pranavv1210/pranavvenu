# Pranav V. - Portfolio

A futuristic personal portfolio for Pranav V., built as a product-style identity system rather than a traditional resume page.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Canvas-based interactive background

## Experience

- Editorial hero with `/public/photo.png` support and graceful fallback
- Compact floating navigation
- Interactive cursor on desktop
- Lightweight technical particle/grid background
- Selected project gallery with animated product visuals
- Direct `/work/[slug]` project detail pages
- Capability map connecting skills to real builds
- Lab, journey, contact, resume, and social links
- Reduced-motion support and responsive layouts

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run typecheck
npm run lint
npm run build
```

The app is ready for Vercel with the default Next.js build command.

## Photo

Add Pranav's portrait at:

```text
public/photo.png
```

The site will render a designed placeholder until that file exists.
