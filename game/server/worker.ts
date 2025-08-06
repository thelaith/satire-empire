/**
 * Satire Empire - Cloudflare Workers Entry Point
 * Main server worker handling API requests and game logic
 */

import { APIResponse, APIError } from '../shared/types/api';

// Environment interface for Cloudflare Workers
export interface Env {
  // Cloudflare bindings
  DB: D1Database;           // D1 database
  KV: KVNamespace;          // KV storage
  GAME_STATE: DurableObjectNamespace; // Game state durable objects
  
  // Environment variables
  PARTYKIT_HOST: string;
  SECRET_KEY: string;
  ENVIRONMENT: string;
}

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
} as const;

// Main worker entry point
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const router = new APIRouter(env, ctx);

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      // Route the request
      const response = await router.handle(request, url);
      
      // Add CORS headers to all responses
      const corsResponse = new Response(response.body, response);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        corsResponse.headers.set(key, value);
      });
      
      return corsResponse;
    } catch (error) {
      console.error('Worker error:', error);
      return createErrorResponse(
        { code: 'INTERNAL_ERROR', message: 'Internal server error' },
        500
      );
    }
  },
} satisfies ExportedHandler<Env>;

/**
 * API Router - Routes requests to appropriate handlers
 */
class APIRouter {
  constructor(
    private env: Env,
    private ctx: ExecutionContext
  ) {}

  async handle(request: Request, url: URL): Promise<Response> {
    const path = url.pathname;
    const method = request.method;

    // API versioning
    if (path.startsWith('/api/v1')) {
      return this.handleV1API(request, url, method);
    }

    // Health check
    if (path === '/health' || path === '/api/health') {
      return createSuccessResponse({ status: 'healthy', timestamp: Date.now() });
    }

    // Default 404 response
    return createErrorResponse(
      { code: 'NOT_FOUND', message: `Endpoint ${path} not found` },
      404
    );
  }

  private async handleV1API(request: Request, url: URL, method: string): Promise<Response> {
    const path = url.pathname.replace('/api/v1', '');

    // Game management endpoints
    if (path.startsWith('/game')) {
      return this.handleGameEndpoints(request, url, method, path);
    }

    // Player endpoints
    if (path.startsWith('/player')) {
      return this.handlePlayerEndpoints(request, url, method, path);
    }

    return createErrorResponse(
      { code: 'NOT_FOUND', message: `API endpoint ${path} not found` },
      404
    );
  }

  private async handleGameEndpoints(
    request: Request, 
    url: URL, 
    method: string, 
    path: string
  ): Promise<Response> {
    // Extract game ID if present
    const gameIdMatch = path.match(/\/game\/([a-zA-Z0-9-]+)/);
    const gameId = gameIdMatch?.[1];

    switch (method) {
      case 'POST':
        if (path === '/game/create') {
          return this.createGame(request);
        }
        if (path.match(/\/game\/[^\/]+\/join/)) {
          return this.joinGame(request, gameId!);
        }
        if (path.match(/\/game\/[^\/]+\/action/)) {
          return this.submitAction(request, gameId!);
        }
        break;

      case 'GET':
        if (path.match(/\/game\/[^\/]+$/)) {
          return this.getGameState(request, gameId!);
        }
        if (path === '/game/list') {
          return this.listGames(request);
        }
        break;
    }

    return createErrorResponse(
      { code: 'NOT_FOUND', message: `Game endpoint ${path} not found` },
      404
    );
  }

  private async handlePlayerEndpoints(
    request: Request, 
    url: URL, 
    method: string, 
    path: string
  ): Promise<Response> {
    // TODO: Implement player management endpoints
    return createErrorResponse(
      { code: 'NOT_IMPLEMENTED', message: 'Player endpoints not yet implemented' },
      501
    );
  }

  // Game endpoint implementations (stubs for now)
  private async createGame(request: Request): Promise<Response> {
    // TODO: Implement game creation logic
    return createErrorResponse(
      { code: 'NOT_IMPLEMENTED', message: 'Create game not yet implemented' },
      501
    );
  }

  private async joinGame(request: Request, gameId: string): Promise<Response> {
    // TODO: Implement join game logic
    return createErrorResponse(
      { code: 'NOT_IMPLEMENTED', message: 'Join game not yet implemented' },
      501
    );
  }

  private async submitAction(request: Request, gameId: string): Promise<Response> {
    // TODO: Implement action submission logic
    return createErrorResponse(
      { code: 'NOT_IMPLEMENTED', message: 'Submit action not yet implemented' },
      501
    );
  }

  private async getGameState(request: Request, gameId: string): Promise<Response> {
    // TODO: Implement get game state logic
    return createErrorResponse(
      { code: 'NOT_IMPLEMENTED', message: 'Get game state not yet implemented' },
      501
    );
  }

  private async listGames(request: Request): Promise<Response> {
    // TODO: Implement list games logic
    return createErrorResponse(
      { code: 'NOT_IMPLEMENTED', message: 'List games not yet implemented' },
      501
    );
  }
}

/**
 * Utility functions for creating consistent API responses
 */
function createSuccessResponse<T>(data: T): Response {
  const response: APIResponse<T> = {
    success: true,
    data,
  };
  
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function createErrorResponse(error: APIError, status: number = 400): Response {
  const response: APIResponse = {
    success: false,
    error,
  };
  
  return new Response(JSON.stringify(response), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}