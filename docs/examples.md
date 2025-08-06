# Satire Empire - Code Examples & Documentation

This document provides comprehensive code examples, patterns, and documentation links for developing Satire Empire.

## 📚 Table of Contents

1. [Game Engine Patterns](#game-engine-patterns)
2. [TypeScript Architecture](#typescript-architecture)  
3. [UI Component Examples](#ui-component-examples)
4. [Cloudflare Workers Backend](#cloudflare-workers-backend)
5. [Multiplayer Integration](#multiplayer-integration)
6. [Testing Patterns](#testing-patterns)
7. [Documentation Links](#documentation-links)

## 🎮 Game Engine Patterns

### Core Game Loop Implementation

```typescript
// Turn-based game engine with phases
class GameEngine {
  async executeTurn(): Promise<void> {
    // Morning Brief (45s)
    await this.morningBriefPhase();
    
    // Action Phase (90-120s) 
    await this.actionPhase();
    
    // Breaking News Resolution (45s)
    await this.breakingNewsPhase();
  }
}
```

**Key Concepts:**
- **Phase-based gameplay**: Each turn has distinct phases with different mechanics
- **Simultaneous actions**: Players queue actions that resolve together
- **Event-driven updates**: Game state changes trigger events and notifications

### Faction System Architecture

```typescript
// Asymmetric faction abilities
abstract class Faction {
  abstract getActionBonus(action: PlayerAction): ActionBonus;
  abstract canPerformAction(action: PlayerAction): boolean;
  abstract getVictoryPriority(): VictoryCondition[];
}

// Example: Influencer Cult faction
class InfluencerCultFaction extends Faction {
  getActionBonus(action: PlayerAction): ActionBonus {
    if (action.type === 'influence') {
      return { multiplier: 1.5, cost: 0.8 }; // More effective influence
    }
    return { multiplier: 1.0, cost: 1.0 };
  }
}
```

**Design Patterns:**
- **Strategy pattern**: Different faction behaviors through inheritance
- **Factory pattern**: Faction creation based on player selection
- **Observer pattern**: Faction abilities react to game events

### Resource Management System

```typescript
interface Resources {
  wealth: number;      // Economic power
  attention: number;   // Social/media influence  
  technology: number;  // Innovation and automation
}

class ResourceManager {
  calculateGeneration(territories: Territory[]): Resources {
    return territories.reduce((total, territory) => ({
      wealth: total.wealth + territory.resources.wealth,
      attention: total.attention + territory.resources.attention,
      technology: total.technology + territory.resources.technology,
    }), { wealth: 0, attention: 0, technology: 0 });
  }
}
```

## 🏗️ TypeScript Architecture

### Shared Type Definitions

```typescript
// game/shared/types/game.ts
export interface GameState {
  id: string;
  turn: number;
  phase: GamePhase;
  players: Player[];
  territories: Territory[];
  events: GameEvent[];
  timeRemaining: number;
}

// API contract types
export interface CreateGameRequest {
  playerName: string;
  factionType: FactionType;
}

export interface ActionResult {
  success: boolean;
  error?: string;
  consequences?: GameConsequence[];
}
```

### Zod Validation Schemas

```typescript
// game/shared/schemas/validation.ts
import { z } from 'zod';

export const PlayerActionSchema = z.object({
  type: z.enum(['invest', 'influence', 'invade']),
  target: z.string(),
  resources: z.object({
    wealth: z.number().min(0),
    attention: z.number().min(0),
    technology: z.number().min(0),
  }),
});

export const GameStateSchema = z.object({
  id: z.string(),
  turn: z.number().positive(),
  phase: z.enum(['morning-brief', 'action-phase', 'breaking-news']),
  players: z.array(PlayerSchema),
  territories: z.array(TerritorySchema),
});
```

### Module Organization

```typescript
// game/shared/index.ts - Barrel export pattern
export * from './types/game';
export * from './types/player'; 
export * from './types/faction';
export * from './constants/gameConfig';
export * from './utils/validation';
export * from './schemas/validation';

// Clean imports in consuming code
import { GameState, PlayerAction, validateAction } from '../shared';
```

## 🎨 UI Component Examples

### Neobrutalism Design System

```tsx
// Bold, high-contrast components with satirical flair
const NeoBrutalCard: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn(
    'bg-white border-4 border-black p-6',
    'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    className
  )}>
    {children}
  </div>
);

// Action buttons with dramatic styling
const ActionButton: React.FC<ActionButtonProps> = ({ 
  action, 
  selected, 
  onClick 
}) => (
  <button
    className={cn(
      'w-full p-4 border-4 border-black font-bold text-lg uppercase',
      'transition-all duration-150',
      selected ? 'bg-yellow-400 shadow-none translate-x-2 translate-y-2' 
               : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
    )}
    onClick={onClick}
  >
    {action}
  </button>
);
```

### Interactive Map Components

```tsx
// Territory markers with game state visualization
const TerritoryMarker: React.FC<TerritoryProps> = ({ 
  territory, 
  onClick,
  isSelected 
}) => {
  const ownerColor = getOwnerColor(territory.owner);
  
  return (
    <div
      className={cn(
        'absolute w-12 h-12 border-4 border-black cursor-pointer',
        'transition-all duration-200 hover:scale-110',
        ownerColor,
        isSelected && 'ring-4 ring-yellow-400 scale-125'
      )}
      style={{ 
        left: `${territory.position.x}%`, 
        top: `${territory.position.y}%` 
      }}
      onClick={() => onClick(territory.id)}
    >
      <div className="w-full h-full flex items-center justify-center font-bold">
        {territory.name[0]}
      </div>
    </div>
  );
};

// Maplibre GL integration
const InteractiveMap: React.FC<MapProps> = ({ territories, onTerritoryClick }) => {
  const mapRef = useRef<maplibregl.Map>();
  
  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: 'map',
      style: 'path/to/satirical-world-style.json',
      center: [0, 30],
      zoom: 2,
    });
    
    // Add territory markers
    territories.forEach(territory => {
      const marker = new maplibregl.Marker()
        .setLngLat([territory.longitude, territory.latitude])
        .addTo(mapRef.current!);
    });
  }, [territories]);
  
  return <div id="map" className="w-full h-full" />;
};
```

### Game UI Layout

```tsx
// Full game board layout
const GameBoard: React.FC = () => (
  <div className="game-board h-screen bg-yellow-100 border-8 border-black">
    {/* Header with game info */}
    <GameHeader />
    
    {/* Main content area */}
    <div className="flex flex-1">
      {/* Map takes up most space */}
      <div className="flex-1 relative">
        <InteractiveMap />
        <NewsTicker />
      </div>
      
      {/* Action panel on the right */}
      <div className="w-96 bg-white border-l-8 border-black">
        <ActionPanel />
        <ResourceDisplay />
        <PlayerList />
      </div>
    </div>
    
    {/* Bottom status bar */}
    <GameStatusBar />
  </div>
);
```

## ⚡ Cloudflare Workers Backend

### Worker Entry Point Pattern

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const router = new ApiRouter(env);
    
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return corsResponse();
    }
    
    try {
      return await router.route(request, url);
    } catch (error) {
      return errorResponse(error);
    }
  }
} satisfies ExportedHandler<Env>;
```

### Durable Objects for Game State

```typescript
export class GameStateObject implements DurableObject {
  private gameEngine: GameEngine;
  
  constructor(private state: DurableObjectState) {
    this.gameEngine = new GameEngine();
  }
  
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/action':
        return this.processAction(request);
      case '/state':
        return this.getGameState();
      default:
        return new Response('Not found', { status: 404 });
    }
  }
  
  // Automatic phase advancement using alarms
  async alarm(): Promise<void> {
    await this.gameEngine.advancePhase();
    await this.persistState();
    await this.notifyPlayers();
  }
}
```

### D1 Database Operations

```typescript
// Game persistence in D1
class GameRepository {
  constructor(private db: D1Database) {}
  
  async createGame(gameData: CreateGameRequest): Promise<string> {
    const gameId = generateGameId();
    
    await this.db.prepare(`
      INSERT INTO games (id, status, settings, created_at) 
      VALUES (?, 'waiting', ?, ?)
    `).bind(gameId, JSON.stringify(gameData), Date.now()).run();
    
    return gameId;
  }
  
  async getPlayerStats(playerId: string): Promise<PlayerStats> {
    const result = await this.db.prepare(`
      SELECT games_played, games_won, favorite_faction
      FROM player_stats 
      WHERE player_id = ?
    `).bind(playerId).first();
    
    return result as PlayerStats;
  }
}
```

## 🔌 Multiplayer Integration

### Partykit WebSocket Setup

```typescript
// Real-time game state synchronization
class GameSync {
  private partySocket: PartySocket;
  
  constructor(gameId: string, playerId: string) {
    this.partySocket = new PartySocket({
      host: process.env.PARTYKIT_HOST,
      room: gameId,
      id: playerId,
    });
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers(): void {
    this.partySocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      switch (message.type) {
        case 'game-state-update':
          this.handleStateUpdate(message.state);
          break;
        case 'player-action':
          this.handlePlayerAction(message.action);
          break;
        case 'phase-change':
          this.handlePhaseChange(message.phase);
          break;
      }
    };
  }
  
  sendAction(action: PlayerAction): void {
    this.partySocket.send(JSON.stringify({
      type: 'player-action',
      action,
      playerId: this.playerId,
      timestamp: Date.now(),
    }));
  }
}
```

### Optimistic Updates Pattern

```typescript
// Client-side optimistic updates with server reconciliation
class GameStore {
  private gameState: GameState;
  private pendingActions: PlayerAction[] = [];
  
  async submitAction(action: PlayerAction): Promise<void> {
    // Optimistic update locally
    this.applyActionLocally(action);
    this.pendingActions.push(action);
    
    try {
      // Send to server
      await this.gameSync.sendAction(action);
    } catch (error) {
      // Rollback on error
      this.rollbackAction(action);
      this.pendingActions = this.pendingActions.filter(a => a !== action);
      throw error;
    }
  }
  
  onServerStateUpdate(serverState: GameState): void {
    // Reconcile with server state
    this.gameState = serverState;
    this.pendingActions = [];
  }
}
```

## 🧪 Testing Patterns

### Unit Testing with Vitest

```typescript
// game/tests/game-engine.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { GameEngine } from '../server/game-engine/engine';
import { mockGameState, mockPlayerAction } from './fixtures';

describe('GameEngine', () => {
  let gameEngine: GameEngine;
  
  beforeEach(() => {
    gameEngine = new GameEngine(mockGameState());
  });
  
  it('should process valid player actions', async () => {
    const action = mockPlayerAction('invest');
    const result = await gameEngine.processAction('player1', action);
    
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });
  
  it('should reject invalid actions', async () => {
    const action = mockPlayerAction('invest', { wealth: 1000 }); // Too expensive
    const result = await gameEngine.processAction('player1', action);
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Insufficient resources');
  });
  
  it('should advance phases correctly', async () => {
    expect(gameEngine.currentPhase).toBe('morning-brief');
    
    await gameEngine.advancePhase();
    expect(gameEngine.currentPhase).toBe('action-phase');
    
    await gameEngine.advancePhase();
    expect(gameEngine.currentPhase).toBe('breaking-news');
  });
});
```

### E2E Testing with Playwright

```typescript
// tests/e2e/game-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete game flow', async ({ page, context }) => {
  // Create game
  await page.goto('/');
  await page.click('[data-testid="create-game"]');
  await page.fill('[data-testid="player-name"]', 'TestPlayer');
  await page.selectOption('[data-testid="faction-select"]', 'influencer-cult');
  await page.click('[data-testid="start-game"]');
  
  // Wait for game board
  await expect(page.locator('[data-testid="game-board"]')).toBeVisible();
  
  // Join with second player
  const gameUrl = page.url();
  const secondPage = await context.newPage();
  await secondPage.goto(gameUrl);
  await secondPage.fill('[data-testid="player-name"]', 'TestPlayer2');
  await secondPage.selectOption('[data-testid="faction-select"]', 'rogue-ai');
  await secondPage.click('[data-testid="join-game"]');
  
  // Test action submission
  await page.click('[data-testid="territory-silicon-valley"]');
  await page.click('[data-testid="action-invest"]');
  await page.fill('[data-testid="wealth-input"]', '50');
  await page.click('[data-testid="submit-action"]');
  
  // Verify action is queued
  await expect(page.locator('[data-testid="queued-actions"]')).toContainText('Invest');
  
  // Wait for phase resolution
  await expect(page.locator('[data-testid="breaking-news"]')).toBeVisible();
});
```

### Cloudflare Workers Testing

```typescript
// tests/workers/api.test.ts  
import { unstable_dev } from 'wrangler';

describe('Game API', () => {
  let worker: UnstableDevWorker;
  
  beforeAll(async () => {
    worker = await unstable_dev('src/worker.ts', {
      experimental: { disableExperimentalWarning: true },
    });
  });
  
  afterAll(async () => {
    await worker.stop();
  });
  
  it('should create new game', async () => {
    const response = await worker.fetch('/api/game/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerName: 'TestPlayer',
        factionType: 'influencer-cult',
      }),
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.gameId).toBeDefined();
    expect(data.gameState.players).toHaveLength(1);
  });
});
```

## 📖 Documentation Links

### Core Technologies
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)**
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)**
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)**
- **[Cloudflare Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/)**
- **[Vite](https://vitejs.dev/guide/)** - Build tool and dev server
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing

### UI/UX Libraries
- **[shadcn/ui](https://ui.shadcn.com/)** - Base UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework  
- **[Neobrutalism Components](https://www.neobrutalism.dev/)** - Design system
- **[Maplibre GL JS](https://maplibre.org/maplibre-gl-js-docs/)** - Map rendering
- **[Framer Motion](https://www.framer.com/motion/)** - Animations (optional)

### Multiplayer & Real-time
- **[Partykit](https://docs.partykit.io/)** - Multiplayer infrastructure
- **[WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)** - Real-time communication

### Game Development Resources
- **[Game Programming Patterns](https://gameprogrammingpatterns.com/)** - Architecture patterns
- **[Real-Time Multiplayer Games](https://gafferongames.com/)** - Networking patterns
- **[Game Balance Design](https://www.gamedeveloper.com/)** - Game design articles

### Context Engineering
- **[Context Engineering Template](../template/README.md)** - Development workflow
- **[PRP Methodology](../template/PRPs/)** - Product Requirements Prompts
- **[Agent Specialization](../agents/README.md)** - Development agents

### Deployment & Operations  
- **[Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare deployment
- **[Cloudflare Pages](https://developers.cloudflare.com/pages/)** - Static site hosting
- **[Web Analytics](https://developers.cloudflare.com/analytics/)** - Performance monitoring

### Testing & Quality
- **[Testing Library](https://testing-library.com/)** - Component testing utilities
- **[Mock Service Worker](https://mswjs.io/)** - API mocking
- **[Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** - WCAG 2.1 AA compliance

---

## 🚀 Getting Started Checklist

1. **Setup Development Environment**
   - [ ] Install Node.js 18+, pnpm, Wrangler CLI
   - [ ] Clone repository and install dependencies  
   - [ ] Configure environment variables

2. **Project Structure**
   - [ ] Create game/ folder structure
   - [ ] Set up shared types and utilities
   - [ ] Initialize UI component library

3. **Backend Foundation** 
   - [ ] Implement Cloudflare Workers API
   - [ ] Set up D1 database schema
   - [ ] Create Durable Objects for game state

4. **Frontend Core**
   - [ ] Build game board UI components
   - [ ] Integrate Maplibre for interactive map
   - [ ] Implement action submission flow

5. **Multiplayer Integration**
   - [ ] Set up Partykit for real-time sync
   - [ ] Implement optimistic updates
   - [ ] Add WebSocket event handling

6. **Game Logic**
   - [ ] Implement core game engine
   - [ ] Add faction system with unique abilities
   - [ ] Create resource and territory management

7. **Testing & Polish**
   - [ ] Write unit tests for game logic
   - [ ] Add E2E tests for critical flows  
   - [ ] Implement accessibility features
   - [ ] Performance optimization

Use the examples above as starting points and reference the documentation links for detailed implementation guidance!