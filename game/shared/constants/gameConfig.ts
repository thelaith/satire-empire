/**
 * Satire Empire - Game Configuration Constants
 * Central configuration for game mechanics and balance
 */

import type { Resources } from '../types/game';
import type { FactionDefinition } from '../types/faction';

// Core game timing (in seconds)
export const GAME_TIMING = {
  MORNING_BRIEF_DURATION: 45,
  ACTION_PHASE_DURATION: 120,
  BREAKING_NEWS_DURATION: 45,
  TURN_TIMEOUT: 300, // 5 minutes max per turn
} as const;

// Player and game limits
export const GAME_LIMITS = {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 8,
  MAX_TURNS: 20,
  MAX_ACTIONS_PER_TURN: 3,
  ACTION_QUEUE_SIZE: 10,
} as const;

// Resource configuration
export const RESOURCE_CONFIG = {
  STARTING_RESOURCES: {
    wealth: 100,
    attention: 50,
    technology: 25,
  } as Resources,
  
  GENERATION_RATES: {
    TERRITORY_BASE: {
      wealth: 10,
      attention: 5,
      technology: 3,
    } as Resources,
    
    COMPOUND_MULTIPLIER: 1.1,
    MAX_GENERATION_PER_TERRITORY: 50,
  },
  
  ACTION_COSTS: {
    invest: { wealth: 30, attention: 10, technology: 0 },
    influence: { wealth: 10, attention: 25, technology: 5 },
    invade: { wealth: 20, attention: 15, technology: 10 },
    'go-viral': { wealth: 5, attention: 40, technology: 0 },
    'cancel-campaign': { wealth: 0, attention: 30, technology: 15 },
    'trend-hijack': { wealth: 15, attention: 35, technology: 20 },
  } as Record<string, Resources>,
} as const;

// Victory conditions thresholds
export const VICTORY_THRESHOLDS = {
  TERRITORIAL_DOMINATION: 0.6, // 60% of territories
  ECONOMIC_EMPIRE: 1000, // wealth threshold
  CULTURAL_HEGEMONY: 0.75, // 75% influence coverage
  INNOVATION_LEADER: 500, // technology points
  ATTENTION_MONOPOLY: 5, // consecutive turns trending
} as const;

// Map configuration
export const MAP_CONFIG = {
  TOTAL_TERRITORIES: 24,
  CORE_TERRITORIES: 8, // Major regions
  BORDER_TERRITORIES: 12, // Smaller strategic regions
  SPECIAL_TERRITORIES: 4, // Unique bonus territories
  
  TERRITORY_TYPES: {
    CORE: 'core',
    BORDER: 'border',
    SPECIAL: 'special',
    NEUTRAL: 'neutral',
  } as const,
  
  STARTING_TERRITORIES_PER_PLAYER: 2,
} as const;

// Faction balance multipliers
export const FACTION_MULTIPLIERS = {
  'influencer-cult': {
    influence_bonus: 1.5,
    attention_generation: 1.3,
    viral_threshold: 0.8,
  },
  
  'rogue-ai': {
    technology_bonus: 1.4,
    automation_efficiency: 1.6,
    hacking_success_rate: 0.9,
  },
  
  'hyper-capitalist': {
    wealth_generation: 1.5,
    investment_returns: 1.4,
    market_manipulation: 1.2,
  },
} as const;

// Event system configuration
export const EVENT_CONFIG = {
  RANDOM_EVENT_CHANCE: 0.3, // 30% chance per turn
  FACTION_EVENT_COOLDOWN: 3, // turns between faction events
  MAX_ACTIVE_EVENTS: 5,
  
  EVENT_CATEGORIES: [
    'economic',
    'cultural', 
    'technological',
    'political',
    'environmental',
    'social',
  ] as const,
} as const;

// Multiplayer networking
export const NETWORK_CONFIG = {
  MAX_MESSAGE_SIZE: 1024 * 16, // 16KB
  HEARTBEAT_INTERVAL: 30000, // 30 seconds
  CONNECTION_TIMEOUT: 60000, // 1 minute
  RECONNECT_ATTEMPTS: 3,
  BATCH_UPDATE_INTERVAL: 100, // ms
} as const;

// Performance and optimization
export const PERFORMANCE_CONFIG = {
  STATE_HISTORY_LIMIT: 50, // turns to keep in history
  REPLAY_COMPRESSION: true,
  DELTA_UPDATES: true,
  CLIENT_PREDICTION: true,
  
  RENDER_BUDGETS: {
    MAX_ENTITIES: 1000,
    MAX_PARTICLES: 500,
    MAX_ANIMATIONS: 50,
  },
} as const;

// Development and debugging
export const DEV_CONFIG = {
  ENABLE_DEBUG_LOGGING: true, // Will be overridden by build process
  MOCK_AI_PLAYERS: false,
  SKIP_AUTH: false,
  FAST_TURNS: false,
} as const;