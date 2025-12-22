# TimeFlow Calendar (万年历 PWA)

A high-performance, mobile-first Perpetual Calendar (万年历) built with React, TypeScript, and the `tyme4ts` library. This application provides comprehensive Solar and Lunar calendar information, festivals, and solar terms, and it works offline as a Progressive Web App (PWA).

## Features

- **Perpetual Calendar:** Seamlessly navigate between years and months.
- **Lunar Calendar:** Accurate Lunar dates, months, and year (GanZhi) information.
- **Solar Terms & Festivals:** Displays traditional Chinese festivals and solar terms.
- **Daily Details:** View "Suitable" (宜) and "Avoid" (忌) activities for any selected day.
- **Legal Holidays:** Highlighting for Chinese legal holidays (Work/Off).
- **PWA Ready:** Installable on mobile and desktop; works offline.
- **Dark Mode Support:** Responsive UI that adapts to system themes.

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Calendar Logic:** `tyme4ts`
- **PWA Plugin:** `vite-plugin-pwa`

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/calendar-pwa.git
   cd calendar-pwa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

### Deployment

To deploy to GitHub Pages:
```bash
npm run deploy
```

## License

MIT