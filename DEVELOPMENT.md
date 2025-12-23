# Development Documentation: 万年历 (Perpetual Calendar)

...

## Troubleshooting

### Blank Page in Production
Ensure the `base` path in `vite.config.ts` matches your deployment subdirectory (e.g., `'/perpetual-calendar-pwa/'`).

### TypeScript Errors with PWA
Ensure `src/vite-env.d.ts` contains the PWA client types reference:
```typescript
/// <reference types="vite-plugin-pwa/client" />
```
