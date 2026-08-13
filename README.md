# Tala

A family expense-sharing app: track shared expenses, split them among family members, and settle balances.

## Features

- Email/password sign in, sign up, and password reset
- Create a family or join one with an invite code
- Add expenses with title, amount, category, date, payer, and notes
- Split each expense equally among selected members
- Dashboard with a monthly snapshot: total spent, what you paid, what you owe, what others owe you
- Expenses list with month, category, and search filters
- Balances: per-member net balances, record settlements, settlement history
- Edit your nickname; view family info and members

## Tech stack

- Expo SDK 57 / React Native 0.86 / React 19
- expo-router (file-based routing)
- TypeScript
- NativeWind (Tailwind CSS)
- Supabase (auth + Postgres backend)
- TanStack React Query

## Getting started

Prerequisites: Node.js and npm, plus a Supabase project with the schema and auth configured.

1. Create `.env.local` with your Supabase credentials:

   ```
   EXPO_PUBLIC_SUPABASE_URL=...
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npx expo start
   ```

## Scripts

| Script            | Purpose                       |
| ----------------- | ----------------------------- |
| `npm start`       | Start the Expo dev server     |
| `npm run android` | Run on Android (native build) |
| `npm run ios`     | Run on iOS (native build)     |
| `npm run web`     | Run the web target            |
| `npm run lint`    | Run ESLint                    |

## Project structure

- `src/app/` — screens and routing (`(public)` auth screens, `(private)` app screens)
- `src/components/` — UI components
- `src/hooks/` — data hooks (React Query)
- `src/services/` — Supabase API calls
- `src/constants/`, `src/utils/` — shared constants and helpers

## Status

Personal project in active development; not published. Amounts are shown in Philippine pesos. No automated tests yet.
