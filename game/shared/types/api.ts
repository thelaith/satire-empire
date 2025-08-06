/**
 * Satire Empire - API Contract Types
 * TypeScript definitions for client-server communication
 */

import type { GameState, Player, PlayerAction, FactionType, ActionResult, GameEvent } from './game';

// Request/Response types
export interface CreateGameRequest {
  playerName: string;
  factionType: FactionType;
  maxPlayers?: number;
  turnDuration?: number;
  gameMode?: string;
}

export interface CreateGameResponse {
  gameId: string;
  gameState: GameState;
  playerId: string;
}

export interface JoinGameRequest {
  gameId: string;
  playerName: string;
  factionType: FactionType;
}

export interface JoinGameResponse {
  success: boolean;
  gameState?: GameState;
  playerId?: string;
  error?: string;
}

export interface SubmitActionRequest {
  gameId: string;
  playerId: string;
  action: PlayerAction;
}

export interface SubmitActionResponse {
  success: boolean;
  result?: ActionResult;
  error?: string;
}

export interface GameStateRequest {
  gameId: string;
  playerId: string;
}

export interface GameStateResponse {
  gameState: GameState;
  playerEvents: GameEvent[];
}

// WebSocket message types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: number;
  playerId?: string;
}

export interface GameStateUpdateMessage extends WebSocketMessage {
  type: 'game-state-update';
  payload: {
    gameState: GameState;
    delta?: any; // For optimization
  };
}

export interface PlayerActionMessage extends WebSocketMessage {
  type: 'player-action';
  payload: {
    action: PlayerAction;
    playerId: string;
  };
}

export interface PhaseChangeMessage extends WebSocketMessage {
  type: 'phase-change';
  payload: {
    newPhase: string;
    timeRemaining: number;
  };
}

export interface PlayerJoinedMessage extends WebSocketMessage {
  type: 'player-joined';
  payload: {
    player: Player;
  };
}

export interface BreakingNewsMessage extends WebSocketMessage {
  type: 'breaking-news';
  payload: {
    headlines: string[];
    events: GameEvent[];
    results: ActionResult[];
  };
}

export interface ChatMessage extends WebSocketMessage {
  type: 'chat-message';
  payload: {
    message: string;
    playerName: string;
    playerId: string;
  };
}

// Error types
export interface APIError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError extends APIError {
  code: 'VALIDATION_ERROR';
  field: string;
  value: any;
}

export interface GameError extends APIError {
  code: 'GAME_ERROR';
  gameId: string;
  playerId?: string;
}

// Utility types for API endpoints
export type APIResponse<T = any> = {
  success: true;
  data: T;
} | {
  success: false;
  error: APIError;
};

export type WebSocketMessageType = 
  | GameStateUpdateMessage 
  | PlayerActionMessage 
  | PhaseChangeMessage 
  | PlayerJoinedMessage 
  | BreakingNewsMessage 
  | ChatMessage;