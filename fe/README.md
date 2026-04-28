# Flight Radar

Frontend application for a realtime flight radar demo.

The app connects to a WebSocket backend, displays aircraft on a MapLibre map, shows a virtualized aircraft list, and opens detailed aircraft information for the selected plane.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Flowbite React
- Zustand
- React Router
- MapLibre GL
- pnpm

## Requirements

- Node.js
- pnpm

## Environment

Frontend expects the backend WebSocket server on port `3000`.

Create or keep `fe/.env`:

```env
VITE_WS_BASE_URL=ws://localhost:3000
VITE_APP_ENV=dev
```

Backend defaults:

```env
PORT=4000
PLANES_COUNT=20
BASIC_UPDATE_INTERVAL_MS=1000
DETAILED_UPDATE_INTERVAL_MS=1000
```

## Install

From the repository root:

```bash
cd be
pnpm install

cd ../fe
pnpm install
```

## Run Locally

Start backend:

```bash
cd be
pnpm dev
```

Start frontend in another terminal:

```bash
cd fe
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Frontend Scripts

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check
```

`pnpm check` runs formatting check, TypeScript check, lint, and production build.

## Project Structure

```text
src/app        App bootstrap, providers, router, route pages
src/widgets    App-level UI blocks such as Topbar
src/features   User-facing feature UI and interactions
src/entities   Domain types, schemas, selectors
src/processes  Flight radar session, WebSocket orchestration, Zustand store
src/shared     API transport, config, errors, utilities, shared UI
```

## Main Features

- Realtime aircraft updates over WebSocket
- Automatic reconnect with visible connection status
- Manual WebSocket reconnect from the top bar
- Lazy-loaded radar map
- Smooth initial loading state
- Animated aircraft movement on the map
- Virtualized aircraft list
- Aircraft details panel
- Safe MapLibre popup rendering through DOM nodes

## Build

```bash
pnpm build
```

The production build is written to `dist/`.
