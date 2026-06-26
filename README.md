# ZERIV TECH — Premium Digital Agency Website

وكالة رقمية فلسطينية متخصصة في البرمجة، التصميم، والهوية البصرية.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **next-themes** (dark/light mode)
- **shadcn/ui** components (Button, Input, Select, etc.)
- **Lucide Icons**

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Pages & API routes
│   ├── page.tsx          # Home
│   ├── services/
│   ├── portfolio/
│   ├── about/
│   ├── contact/
│   └── api/contact/      # Mock contact API
├── components/
│   ├── brand/            # Logo, HeroVisual
│   ├── effects/          # Animations
│   ├── layout/           # Navbar, Footer, Theme
│   ├── patterns/         # Tatreez & Circuit SVGs
│   ├── sections/         # Page sections
│   └── ui/               # shadcn-style components
└── lib/
    ├── mock-data.ts      # Services, portfolio, process data
    └── contact.ts        # Form validation & mock submission
```

## Contact Form (Mock Mode)

The contact form currently uses **mock data** — no Supabase connection required.

- Submissions are validated and stored in-memory via `/api/contact`
- Full validation, loading states, success/error messages included
- When ready to connect Supabase, see `supabase/migrations/001_contact_requests.sql`

### To connect Supabase later:

1. Create a Supabase project
2. Run the SQL migration in `supabase/migrations/001_contact_requests.sql`
3. Add environment variables to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Replace mock logic in `src/lib/contact.ts` with Supabase client calls

## Pages

| Page | Route | Description |
|------|-------|-------------|
| الرئيسية | `/` | Hero, services, portfolio, process, about, CTA |
| خدماتنا | `/services` | Full services listing |
| أعمالنا | `/portfolio` | Project showcase |
| عنا | `/about` | About + process + stats |
| تواصل معنا | `/contact` | Contact form |

## Design System

| Token | Value |
|-------|-------|
| Dark | `#050706`, `#090909`, `#0B0F0E` |
| Off-white | `#F3EFE7` |
| Green | `#0F8B5F` |
| Red | `#C1272D` |
| Gold | `#BFA26A` |

## Build

```bash
npm run build
npm start
```

## License

Private — ZERIV TECH © 2026
