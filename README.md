# Cloudflare Workers React Template

[![[cloudflarebutton]]](https://deploy.workers.cloudflare.com)

A production-ready full-stack application template powered by Cloudflare Workers. Features a modern React frontend with Shadcn/UI components, Tailwind CSS, and a robust backend using Hono, Durable Objects for persistent state, and TypeScript end-to-end.

## ✨ Key Features

- **Edge-Native Backend**: Lightning-fast API routes with Hono on Cloudflare Workers
- **Durable Objects**: Built-in stateful storage for counters, lists, and user data (SQLite-backed)
- **Modern React Frontend**: Vite + React 18 + TypeScript + React Router + TanStack Query
- **Beautiful UI**: Shadcn/UI components, Tailwind CSS with custom design system, dark mode
- **Developer Experience**: Hot reload, type generation, error boundaries, client error reporting
- **Production-Ready**: CORS, logging, health checks, Observability enabled
- **Mobile-Responsive**: Sidebar layout, theme toggle, animations
- **Extensible**: Easy to add routes (`worker/userRoutes.ts`), pages (`src/pages/`), components

Demo endpoints included: `/api/health`, `/api/counter`, `/api/demo` (CRUD with Durable Objects).

## 🛠️ Technology Stack

### Frontend
- **React 18** + **Vite** (fast HMR)
- **TypeScript** (strict, type-safe)
- **Tailwind CSS** + **Shadcn/UI** (accessible components)
- **TanStack Query** (data fetching/caching)
- **React Router** (file-based routing)
- **Zustand** (state management) + **Immer**
- **Lucide React** (icons) + **Sonner** (toasts)
- **Framer Motion** (animations)

### Backend
- **Cloudflare Workers** (edge runtime)
- **Hono** (ultra-fast router)
- **Durable Objects** (stateful, SQLite persistent storage)
- **TypeScript** (shared types in `@/shared/`)

### Tooling
- **Bun** (fast package manager/scripts)
- **Wrangler** (CLI deployment)
- **ESLint** + **TypeScript** (linting/type-checking)

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <your-repo>
   cd retrobyte-a1633-dwzox8shn3ulsan3fedck
   bun install
   ```

2. **Development**
   ```bash
   bun run dev
   ```
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:8787/api/health`

3. **Type Generation** (Workers env types)
   ```bash
   bun run cf-typegen
   ```

4. **Build & Preview**
   ```bash
   bun run build
   bun run preview
   ```

## 📚 Usage

### Adding API Routes
Edit `worker/userRoutes.ts`:
```typescript
app.get('/api/your-route', (c) => c.json({ message: 'Hello!' }));
```
Uses Durable Objects for state:
```typescript
const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName('global'));
await stub.increment(); // Persistent counter
```

### Adding Pages
- Create `src/pages/YourPage.tsx`
- Add to `src/main.tsx` router

### Shared Types
Define in `shared/types.ts`, auto-imported everywhere.

### UI Components
- Shadcn/UI: `npx shadcn-ui@latest add button` (pre-installed most)
- Custom: `src/components/`, hooks in `src/hooks/`

## 🔧 Development Workflow

- **Hot Reload**: Frontend auto-reloads, Worker hot-reloads on save
- **Custom Routes**: Add to `userRoutes.ts` (core files protected)
- **Durable Object**: Extend `worker/durableObject.ts` methods
- **Linting**: `bun run lint`
- **Error Reporting**: Client errors logged to Worker console
- **Themes**: Toggle dark/light mode (persists in localStorage)

## ☁️ Deployment

Deploy to Cloudflare Workers in one command:

```bash
bun run deploy
```

Or use the [cloudflarebutton] for instant deployment with your repo.

### Prerequisites
- Cloudflare account
- `wrangler login`
- Set secrets: `wrangler secret put YOUR_SECRET`

Config: `wrangler.jsonc` (Durable Objects pre-configured).

### Assets & SPA
- Static assets served from `/dist` (Vite build)
- API routes (`/api/*`) handled by Worker first
- SPA fallback for all other routes

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. Make changes in `src/` or `worker/userRoutes.ts`
4. Test locally: `bun run dev`
5. PR to `main`

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

⭐ **Star on GitHub** | 💬 **Join Discord** | 📖 **Docs**