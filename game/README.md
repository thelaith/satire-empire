# Satire Empire - Game Core

This is the main game implementation for **Satire Empire**, a satirical multiplayer strategy game built with TypeScript and Cloudflare's edge computing platform.

## 🏗️ Architecture

The game follows a client-server architecture optimized for Cloudflare's edge network:

- **`client/`** - Frontend TypeScript application built with Vite
- **`server/`** - Backend Cloudflare Workers with Durable Objects
- **`shared/`** - Shared TypeScript types and utilities
- **`assets/`** - Game assets and static resources
- **`tests/`** - Comprehensive test suite

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Cloudflare account for deployment

### Development Setup

```bash
# Install dependencies
npm install

# Start development servers (client + server)
npm run dev

# Or start individually
npm run dev:client  # Frontend on :5173
npm run dev:server  # Cloudflare Workers on :8787
```

### Building for Production

```bash
# Build everything
npm run build

# Or build individually
npm run build:client  # Client to dist/client
npm run build:server  # Deploy to Cloudflare Workers
```

## 🎮 Core Features

### Game Mechanics
- **Turn-based gameplay** with "News Cycle" structure
- **Asymmetric factions** with unique abilities
- **Resource management** (Wealth, Attention, Technology)
- **Territory control** with strategic positioning
- **Event-driven narrative** with satirical headlines

### Technical Features
- **Real-time multiplayer** using Partykit WebSockets
- **Edge-first architecture** for global low latency
- **PWA support** with offline capabilities
- **Type-safe** end-to-end TypeScript
- **Modern ES modules** for optimal performance

## 🧪 Testing

```bash
# Unit tests with Vitest
npm test

# E2E tests with Playwright
npm run test:e2e

# Type checking
npm run type-check
```

## 📁 Project Structure

```
game/
├── client/                    # Frontend application
│   ├── components/           # UI components
│   │   ├── game/            # Game-specific components
│   │   ├── lobby/           # Lobby and matchmaking
│   │   ├── map/             # Map and territory components
│   │   └── ui/              # Shared UI components
│   ├── services/            # Client services
│   ├── stores/              # State management
│   ├── utils/               # Client utilities
│   ├── main.ts              # App entry point
│   ├── vite.config.ts       # Vite configuration
│   └── index.html           # HTML template
├── server/                   # Backend services
│   ├── api/                 # API endpoints
│   ├── game-engine/         # Core game logic
│   │   ├── actions/         # Player actions
│   │   ├── events/          # Game events
│   │   ├── factions/        # Faction definitions
│   │   └── engine.ts        # Main game engine
│   ├── multiplayer/         # Real-time features
│   ├── persistence/         # Data storage
│   ├── worker.ts            # Workers entry point
│   └── wrangler.toml        # Cloudflare configuration
├── shared/                   # Shared code
│   ├── types/               # TypeScript definitions
│   │   ├── game.ts          # Game state types
│   │   ├── faction.ts       # Faction system types
│   │   └── api.ts           # API contract types
│   ├── constants/           # Game configuration
│   └── index.ts             # Barrel exports
├── assets/                   # Game assets
├── tests/                    # Test suite
└── package.json             # Project configuration
```

## 🎯 Development Guidelines

### Code Style
- **TypeScript everywhere** with strict mode enabled
- **ES modules** for optimal tree shaking
- **Functional programming** patterns where appropriate
- **Modular architecture** with clear separation of concerns

### Performance
- **Bundle size < 200KB** gzipped for initial load
- **Core Web Vitals** compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **60 FPS** gameplay on target devices
- **Sub-100ms** network latency for actions

### Testing
- **Unit tests** for all game logic and utilities
- **Integration tests** for API endpoints
- **E2E tests** for critical user flows
- **>85% code coverage** target

## 🔧 Configuration

### Environment Variables

```bash
# Development
VITE_API_URL=http://localhost:8787
VITE_PARTYKIT_HOST=localhost:1999
VITE_ENVIRONMENT=development

# Production
VITE_API_URL=https://api.satire-empire.com
VITE_PARTYKIT_HOST=partykit.satire-empire.com
VITE_ENVIRONMENT=production
```

### Cloudflare Setup

1. Install Wrangler CLI: `npm install -g wrangler`
2. Authenticate: `wrangler auth login`
3. Configure D1 database: `wrangler d1 create satire-empire-db`
4. Set up KV namespace: `wrangler kv:namespace create "GAME_SESSION"`
5. Update `wrangler.toml` with your resource IDs

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Staging
```bash
npm run build
wrangler deploy --env staging
```

### Production
```bash
npm run build
wrangler deploy --env production
```

## 📈 Monitoring

- **Error tracking** with Sentry integration
- **Performance monitoring** with Core Web Vitals
- **Game analytics** with custom metrics
- **Real-time monitoring** with Cloudflare Analytics

## 🤝 Contributing

1. Follow the established code patterns
2. Write tests for new features
3. Update documentation for significant changes
4. Ensure accessibility compliance
5. Test on mobile and desktop

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.