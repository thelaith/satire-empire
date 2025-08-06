/**
 * Satire Empire - Faction System Types
 * TypeScript definitions for asymmetric faction mechanics
 */

import type { ActionBonus, ActionType, PlayerAction, VictoryCondition, Resources } from './game';

export interface FactionDefinition {
  id: string;
  name: string;
  description: string;
  satiricalTarget: string; // What real-world institution this parodies
  color: string;
  abilities: FactionAbility[];
  victoryPriorities: VictoryCondition[];
  startingResources: Resources;
}

export interface FactionAbility {
  id: string;
  name: string;
  description: string;
  type: 'passive' | 'active' | 'reaction';
  cooldown?: number;
  cost?: Resources;
  conditions?: AbilityCondition[];
}

export interface AbilityCondition {
  type: 'resource-threshold' | 'territory-count' | 'turn-number' | 'player-action';
  value: any;
  comparison: 'equals' | 'greater' | 'less' | 'greater-equal' | 'less-equal';
}

export interface FactionStats {
  actionBonuses: Record<ActionType, ActionBonus>;
  resourceMultipliers: Partial<Resources>;
  specialAbilities: string[];
  weaknesses: string[];
}

// Specific faction interfaces
export interface InfluencerCultData extends FactionDefinition {
  viralThreshold: number;
  influenceDecayRate: number;
  trendingTopics: string[];
}

export interface RogueAIData extends FactionDefinition {
  automationLevel: number;
  hackingCapabilities: string[];
  dataProcessingBonus: number;
}

export interface HyperCapitalistData extends FactionDefinition {
  marketManipulation: number;
  investmentPortfolio: Record<string, number>;
  economicInfluence: number;
}

export type FactionData = InfluencerCultData | RogueAIData | HyperCapitalistData;

export interface FactionInstance {
  definition: FactionDefinition;
  playerId: string;
  activeAbilities: string[];
  abilityCount: Record<string, number>;
  customData: any;
}