/**
 * Satire Empire - Base Faction Class
 * Abstract base class for all faction implementations
 */

import { 
  ActionBonus, 
  ActionType, 
  PlayerAction, 
  VictoryCondition,
  Resources
} from '../../../shared/types/game';
import { FactionDefinition, FactionAbility } from '../../../shared/types/faction';

export abstract class BaseFaction {
  protected definition: FactionDefinition;

  constructor(definition: FactionDefinition) {
    this.definition = definition;
  }

  /**
   * Get faction ID
   */
  get id(): string {
    return this.definition.id;
  }

  /**
   * Get faction name
   */
  get name(): string {
    return this.definition.name;
  }

  /**
   * Get faction description
   */
  get description(): string {
    return this.definition.description;
  }

  /**
   * Get faction definition (read-only)
   */
  getDefinition(): Readonly<FactionDefinition> {
    return { ...this.definition };
  }

  /**
   * Calculate action bonus for a specific action type
   */
  abstract getActionBonus(actionType: ActionType): ActionBonus;

  /**
   * Check if faction can perform a specific action
   */
  abstract canPerformAction(action: PlayerAction): boolean;

  /**
   * Get victory conditions in priority order
   */
  abstract getVictoryPriorities(): VictoryCondition[];

  /**
   * Process faction-specific ability
   */
  abstract processAbility(abilityId: string, context: any): Promise<any>;

  /**
   * Get faction's starting resources
   */
  getStartingResources(): Resources {
    return { ...this.definition.startingResources };
  }

  /**
   * Check if ability is available
   */
  protected isAbilityAvailable(abilityId: string, context: any): boolean {
    const ability = this.definition.abilities.find(a => a.id === abilityId);
    if (!ability) {
      return false;
    }

    // Check cooldown
    if (ability.cooldown && context.lastUsed) {
      const timeSinceUsed = Date.now() - context.lastUsed;
      if (timeSinceUsed < ability.cooldown * 1000) {
        return false;
      }
    }

    // Check resource cost
    if (ability.cost && context.resources) {
      if (ability.cost.wealth > context.resources.wealth ||
          ability.cost.attention > context.resources.attention ||
          ability.cost.technology > context.resources.technology) {
        return false;
      }
    }

    // Check conditions
    if (ability.conditions) {
      for (const condition of ability.conditions) {
        if (!this.evaluateCondition(condition, context)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Evaluate ability condition
   */
  protected evaluateCondition(condition: any, context: any): boolean {
    // Mock condition evaluation - implement specific logic based on condition type
    switch (condition.type) {
      case 'resource-threshold':
        const resourceValue = context.resources?.[condition.resource] || 0;
        return this.compareValues(resourceValue, condition.value, condition.comparison);
      
      case 'territory-count':
        const territoryCount = context.territories?.length || 0;
        return this.compareValues(territoryCount, condition.value, condition.comparison);
      
      case 'turn-number':
        const turnNumber = context.turn || 0;
        return this.compareValues(turnNumber, condition.value, condition.comparison);
      
      default:
        return true;
    }
  }

  /**
   * Compare values based on comparison operator
   */
  protected compareValues(actual: number, expected: number, comparison: string): boolean {
    switch (comparison) {
      case 'equals': return actual === expected;
      case 'greater': return actual > expected;
      case 'less': return actual < expected;
      case 'greater-equal': return actual >= expected;
      case 'less-equal': return actual <= expected;
      default: return false;
    }
  }

  /**
   * Apply resource cost for ability
   */
  protected applyResourceCost(cost: Resources, playerResources: Resources): Resources {
    return {
      wealth: Math.max(0, playerResources.wealth - cost.wealth),
      attention: Math.max(0, playerResources.attention - cost.attention),
      technology: Math.max(0, playerResources.technology - cost.technology),
    };
  }
}