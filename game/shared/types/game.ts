/**
 * Satire Empire - Shared Game Types
 * Core TypeScript definitions shared between client and server
 */

export type GamePhase = 'lobby' | 'morning-brief' | 'action-phase' | 'breaking-news' | 'finished';
export type FactionType = 'influencer-cult' | 'rogue-ai' | 'hyper-capitalist';
export type ActionType = 'invest' | 'influence' | 'invade' | 'go-viral' | 'cancel-campaign' | 'trend-hijack';

export interface GameState {
  id: string;
  version: string;
  turn: number;
  phase: GamePhase;
  players: Player[];
  territories: Territory[];
  events: GameEvent[];
  timeRemaining: number;
  metadata: GameMetadata;
}

export interface Player {
  id: string;
  name: string;
  faction: FactionType;
  resources: Resources;
  territories: string[];
  actions: QueuedAction[];
  isConnected: boolean;
  lastActionTime: number;
}

export interface Territory {
  id: string;
  name: string;
  owner?: string;
  position: {
    x: number;
    y: number;
    longitude: number;
    latitude: number;
  };
  resources: Resources;
  influence: Record<string, number>;
  specialProperties: string[];
}

export interface Resources {
  wealth: number;      // Economic power
  attention: number;   // Social/media influence  
  technology: number;  // Innovation and automation
}

export interface QueuedAction {
  id: string;
  type: ActionType;
  target: string;
  resources: Resources;
  timestamp: number;
  playerId: string;
}

export interface PlayerAction {
  type: ActionType;
  target: string;
  resources: Resources;
}

export interface GameEvent {
  id: string;
  type: string;
  title: string;
  description: string;
  turn: number;
  effects: GameConsequence[];
  expiresAt?: number;
}

export interface GameConsequence {
  type: 'resource-change' | 'territory-change' | 'faction-bonus' | 'narrative-event';
  description: string;
  effects: any;
  targetPlayer?: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
  consequences?: GameConsequence[];
}

export interface ActionResolution {
  action: PlayerAction;
  playerId: string;
  result: ActionResult;
  narrativeEffects: string[];
}

export interface GameMetadata {
  createdAt: number;
  updatedAt: number;
  maxPlayers: number;
  turnDuration: number;
  gameMode: string;
}

export interface VictoryCondition {
  type: 'territorial-domination' | 'economic-empire' | 'cultural-hegemony' | 'innovation-leader' | 'attention-monopoly';
  description: string;
  progress?: number;
  threshold?: number;
}

export interface ActionBonus {
  multiplier: number;
  cost: number;
  description?: string;
}