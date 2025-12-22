# Development Documentation: TimeFlow Calendar

## Architecture Overview

The project follows a standard React + Vite structure, optimized for PWA delivery.

### Directory Structure

- `src/hooks`: Contains the core calendar engine logic.
- `src/components`: UI components built with Tailwind CSS.
- `src/utils`: (Optional) Helper functions.
- `src/types`: Centralized TypeScript interfaces.
- `public/`: Static assets and PWA icons.

## Core Logic: `useCalendar` Hook

The `useCalendar` hook is the heart of the application. It generates a 42-day grid (6x7) for any given year and month.

- **Library:** Uses `tyme4ts` for all conversions.
- **Input:** `year` (number), `month` (1-12).
- **Output:** Array of `CalendarDay` objects.
- **Optimization:** Generation is wrapped in `useEffect` and handles Solar/Lunar festival mapping.

## PWA Implementation

We use `vite-plugin-pwa` with the `autoUpdate` strategy.

- **Manifest:** Defined in `vite.config.ts`.
- **Service Worker:** Generated during build (`sw.js`).
- **Update Logic:** Handled by `src/components/ReloadPrompt.tsx`, which uses the `virtual:pwa-register/react` hook to detect and apply updates.

## Styling Guidelines

- **Mobile-First:** All layouts are designed for small screens first, using Tailwind's utility classes.
- **Theming:** Uses Tailwind's `dark:` variant. `index.css` initializes the base Tailwind layers.
- **Touch Targets:** Buttons and interactive elements are sized for mobile usability (min 44px).

## API Patterns (tyme4ts)

We strictly follow the `tyme4ts` API for data accuracy:
- `SolarDay.fromYmd(y, m, d)`
- `solar.getLunarDay()`
- `lunar.getFestival()`
- `solar.getTerm()`

## Troubleshooting

### Blank Page in Production
Ensure the `base` path in `vite.config.ts` matches your deployment subdirectory (e.g., `'/calendar-pwa/'`).

### TypeScript Errors with PWA
Ensure `src/vite-env.d.ts` contains the PWA client types reference:
```typescript
/// <reference types="vite-plugin-pwa/client" />
```
