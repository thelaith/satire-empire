/**
 * Satire Empire - Cloudflare Workers Examples
 * Backend API patterns and multiplayer integration
 */

// Type Definitions
interface CreateGameRequest {
  playerName: string;
  factionType: FactionType;
}

interface SubmitActionRequest {
  playerId: string;
  action: PlayerAction;
}

interface GameState {
  id: string;
  turn: number;
  phase: GamePhase;
  players: Player[];
  territories: Territory[];
  events: GameEvent[];
  timeRemaining: number;
  createdAt: number;
  updatedAt: number;
}

interface Player {
  id: string;
  name: string;
  faction: FactionType;
  resources: Resources;
  territories: string[];
  actions: QueuedAction[];
}

interface Territory {
  id: string;
  name: string;
  resources: Resources;
  influence: Record<string, number>;
  specialProperties: string[];
  position: { x: number; y: number };
}

interface Resources {
  wealth: number;
  attention: number;
  technology: number;
}

interface QueuedAction {
  type: string;
  target: string;
  resources: Resources;
}

interface GameEvent {
  id: string;
  type: string;
  description: string;
  effects: any;
}

interface PlayerAction {
  type: string;
  target: string;
  resources: Resources;
}

interface ActionResult {
  success: boolean;
  error?: string;
  consequences?: any[];
}

type GamePhase = 'morning-brief' | 'action-phase' | 'breaking-news';
type FactionType = 'influencer-cult' | 'rogue-ai' | 'hyper-capitalist';

// Cloudflare Workers Types
interface Env {
  DB: D1Database;
  GAME_DATA: KVNamespace;
  GAME_STATE: DurableObjectNamespace;
  PARTYKIT_HOST: string;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  run(): Promise<D1Result>;
}

interface D1Result {
  success: boolean;
  error?: string;
  meta: any;
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface DurableObjectNamespace {
  idFromName(name: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub;
}

interface DurableObjectId {}

interface DurableObjectStub {
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}

interface DurableObjectState {
  storage: DurableObjectStorage;
}

interface DurableObjectStorage {
  get(key: string): Promise<any>;
  put(key: string, value: any): Promise<void>;
  setAlarm(time: number): Promise<void>;
}

interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

type ExportedHandler<Env> = {
  fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
};

// Mock GameEngine class for the example
class GameEngine {
  private state: GameState;

  constructor(initialState: GameState) {
    this.state = initialState;
  }

  async processAction(playerId: string, action: PlayerAction): Promise<ActionResult> {
    // Mock implementation
    return { success: true };
  }

  async advancePhase(): Promise<void> {
    // Mock implementation
  }

  getState(): GameState {
    return this.state;
  }
}

// Main Worker Entry Point
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const router = new Router(env, ctx);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    try {
      return await router.handle(request, url);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { 
        status: 500,
        headers: corsHeaders,
      });
    }
  },
} satisfies ExportedHandler<Env>;

// API Router
class Router {
  constructor(private env: Env, private ctx: ExecutionContext) {}

  async handle(request: Request, url: URL): Promise<Response> {
    const path = url.pathname;
    const method = request.method;

    // Game API routes
    if (path.startsWith('/api/game')) {
      return this.handleGameAPI(request, path, method);
    }

    // Player API routes  
    if (path.startsWith('/api/player')) {
      return this.handlePlayerAPI(request, path, method);
    }

    // Lobby API routes
    if (path.startsWith('/api/lobby')) {
      return this.handleLobbyAPI(request, path, method);
    }

    return new Response('Not Found', { 
      status: 404,
      headers: corsHeaders,
    });
  }

  private async handleGameAPI(request: Request, path: string, method: string): Promise<Response> {
    const gameController = new GameController(this.env);

    switch (true) {
      case path === '/api/game/create' && method === 'POST':
        return gameController.createGame(request);
        
      case path.match(/\/api\/game\/(\w+)$/) && method === 'GET':
        const gameId = path.split('/').pop()!;
        return gameController.getGame(gameId);
        
      case path.match(/\/api\/game\/(\w+)\/join$/) && method === 'POST':
        const joinGameId = path.split('/')[3];
        return gameController.joinGame(joinGameId, request);
        
      case path.match(/\/api\/game\/(\w+)\/action$/) && method === 'POST':
        const actionGameId = path.split('/')[3];
        return gameController.submitAction(actionGameId, request);
        
      default:
        return new Response('Not Found', { status: 404, headers: corsHeaders });
    }
  }

  private async handlePlayerAPI(request: Request, path: string, method: string): Promise<Response> {
    // Mock implementation for player management
    return new Response('Player API not implemented', { status: 501, headers: corsHeaders });
  }

  private async handleLobbyAPI(request: Request, path: string, method: string): Promise<Response> {
    // Mock implementation for lobby management
    return new Response('Lobby API not implemented', { status: 501, headers: corsHeaders });
  }
}

// Game Controller
class GameController {
  constructor(private env: Env) {}

  async createGame(request: Request): Promise<Response> {
    try {
      const { playerName, factionType } = await request.json() as CreateGameRequest;
      
      // Generate game ID
      const gameId = this.generateGameId();
      
      // Create initial game state
      const gameState: GameState = {
        id: gameId,
        turn: 1,
        phase: 'morning-brief',
        players: [{
          id: this.generatePlayerId(),
          name: playerName,
          faction: factionType,
          resources: { wealth: 100, attention: 50, technology: 25 },
          territories: [],
          actions: [],
        }],
        territories: await this.initializeMap(),
        events: [],
        timeRemaining: 45,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Store in Durable Object
      const durableObjectId = this.env.GAME_STATE.idFromName(gameId);
      const durableObject = this.env.GAME_STATE.get(durableObjectId);
      await durableObject.fetch('http://fake/initialize', {
        method: 'POST',
        body: JSON.stringify(gameState),
      });

      // Store game metadata in D1
      await this.env.DB.prepare(`
        INSERT INTO games (id, status, player_count, created_at)
        VALUES (?, 'waiting', 1, ?)
      `).bind(gameId, Date.now()).run();

      return Response.json({ gameId, gameState }, { headers: corsHeaders });
    } catch (error) {
      console.error('Error creating game:', error);
      return new Response('Failed to create game', { 
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  async getGame(gameId: string): Promise<Response> {
    try {
      // Get game from Durable Object
      const durableObjectId = this.env.GAME_STATE.idFromName(gameId);
      const durableObject = this.env.GAME_STATE.get(durableObjectId);
      const response = await durableObject.fetch('http://fake/state');
      
      if (!response.ok) {
        return new Response('Game not found', { 
          status: 404,
          headers: corsHeaders,
        });
      }

      const gameState = await response.json();
      return Response.json(gameState, { headers: corsHeaders });
    } catch (error) {
      console.error('Error getting game:', error);
      return new Response('Failed to get game', { 
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  async joinGame(gameId: string, request: Request): Promise<Response> {
    try {
      const { playerName, factionType } = await request.json() as CreateGameRequest;
      
      // Forward to Durable Object for processing
      const durableObjectId = this.env.GAME_STATE.idFromName(gameId);
      const durableObject = this.env.GAME_STATE.get(durableObjectId);
      const response = await durableObject.fetch('http://fake/join', {
        method: 'POST',
        body: JSON.stringify({ playerName, factionType }),
      });

      return new Response(response.body, {
        status: response.status,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error('Error joining game:', error);
      return new Response('Failed to join game', { 
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  async submitAction(gameId: string, request: Request): Promise<Response> {
    try {
      const { playerId, action } = await request.json() as SubmitActionRequest;
      
      // Forward to Durable Object for processing
      const durableObjectId = this.env.GAME_STATE.idFromName(gameId);
      const durableObject = this.env.GAME_STATE.get(durableObjectId);
      const response = await durableObject.fetch('http://fake/action', {
        method: 'POST',
        body: JSON.stringify({ playerId, action }),
      });

      return new Response(response.body, {
        status: response.status,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error('Error submitting action:', error);
      return new Response('Failed to submit action', { 
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  private generateGameId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private generatePlayerId(): string {
    return crypto.randomUUID();
  }

  private async initializeMap(): Promise<Territory[]> {
    // Load map data from KV or return default
    const mapData = await this.env.GAME_DATA.get('default-map');
    return mapData ? JSON.parse(mapData) : defaultTerritories;
  }
}

// Durable Object for Game State Management
export class GameStateDurableObject {
  private state: DurableObjectState;
  private env: Env;
  private gameState: GameState | null = null;
  private gameEngine: GameEngine | null = null;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/initialize':
        return this.initialize(request);
      case '/state':
        return this.getState();
      case '/action':
        return this.processAction(request);
      case '/advance-phase':
        return this.advancePhase();
      default:
        return new Response('Not Found', { status: 404 });
    }
  }

  private async initialize(request: Request): Promise<Response> {
    const initialState = await request.json();
    
    // Store initial state
    await this.state.storage.put('gameState', initialState);
    this.gameState = initialState;
    
    // Initialize game engine
    this.gameEngine = new GameEngine(initialState);
    
    // Set up phase timer
    this.schedulePhaseAdvancement();
    
    return new Response('OK');
  }

  private async getState(): Promise<Response> {
    if (!this.gameState) {
      this.gameState = await this.state.storage.get('gameState');
    }
    
    if (!this.gameState) {
      return new Response('Game not found', { status: 404 });
    }
    
    return Response.json(this.gameState);
  }

  private async processAction(request: Request): Promise<Response> {
    const { playerId, action } = await request.json();
    
    if (!this.gameEngine) {
      return new Response('Game not initialized', { status: 400 });
    }
    
    // Process action through game engine
    const result = await this.gameEngine.processAction(playerId, action);
    
    // Update stored state
    this.gameState = this.gameEngine.getState();
    await this.state.storage.put('gameState', this.gameState);
    
    // Notify connected clients via Partykit
    await this.notifyClients('action-processed', { playerId, action, result });
    
    return Response.json(result);
  }

  private async advancePhase(): Promise<Response> {
    if (!this.gameEngine) {
      return new Response('Game not initialized', { status: 400 });
    }
    
    await this.gameEngine.advancePhase();
    
    // Update stored state
    this.gameState = this.gameEngine.getState();
    await this.state.storage.put('gameState', this.gameState);
    
    // Schedule next phase advancement
    this.schedulePhaseAdvancement();
    
    // Notify clients of phase change
    await this.notifyClients('phase-advanced', { 
      phase: this.gameState.phase,
      timeRemaining: this.gameState.timeRemaining,
    });
    
    return new Response('OK');
  }

  private schedulePhaseAdvancement(): void {
    if (!this.gameState) return;
    
    // Schedule phase advancement using Durable Object alarms
    const phaseTimeouts = {
      'morning-brief': 45000,      // 45 seconds
      'action-phase': 120000,      // 2 minutes  
      'breaking-news': 45000,      // 45 seconds
    };
    
    const timeout = phaseTimeouts[this.gameState.phase] || 45000;
    this.state.storage.setAlarm(Date.now() + timeout);
  }

  async alarm(): Promise<void> {
    // Automatically advance phase when alarm triggers
    await this.advancePhase();
  }

  private async notifyClients(type: string, data: any): Promise<void> {
    // Integration with Partykit for real-time notifications
    // This would be implemented with your Partykit setup
    const partyKitUrl = `${this.env.PARTYKIT_HOST}/party/${this.gameState?.id}`;
    
    await fetch(partyKitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data }),
    });
  }
}



// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Default Map Data
const defaultTerritories: Territory[] = [
  {
    id: 'silicon-valley',
    name: 'Silicon Valley',
    resources: { wealth: 20, attention: 15, technology: 25 },
    influence: {},
    specialProperties: ['tech-hub', 'innovation-bonus'],
    position: { x: 20, y: 60 },
  },
  {
    id: 'wall-street',
    name: 'Wall Street',
    resources: { wealth: 30, attention: 10, technology: 5 },
    influence: {},
    specialProperties: ['financial-center', 'wealth-bonus'],
    position: { x: 80, y: 40 },
  },
  {
    id: 'hollywood',
    name: 'Hollywood',
    resources: { wealth: 15, attention: 25, technology: 10 },
    influence: {},
    specialProperties: ['media-center', 'attention-bonus'],
    position: { x: 15, y: 65 },
  },
  // Add more territories...
];