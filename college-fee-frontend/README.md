# College Fee Frontend (Vite + React + Tailwind)

Simple demo UI where a student enters enrollment number, sees details, and gets a UPI link to pay.
Uses **mock data now**, but is **ready to switch to a backend** later.

## Quick Start
```bash
npm install
npm run dev
```

## Switching to Backend Later
- In `src/components/SearchStudent.jsx`, toggle the **Use backend API** checkbox in the UI,
  or set `useBackend` to `true` by default.
- Update `BASE_URL` to your server (e.g., `http://localhost:5000`).

## Tailwind Included
This project already has TailwindCSS configured.
