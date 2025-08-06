/**
 * Satire Empire - Influencer Cult Faction
 * Specializes in viral marketing and social manipulation
 */

import { ActionBonus, ActionType, PlayerAction, VictoryCondition } from '../../../shared/types/game';
import { FactionDefinition } from '../../../shared/types/faction';
import { BaseFaction } from './baseFaction';
import { FACTION_MULTIPLIERS } from '../../../shared/constants/gameConfig';

export class InfluencerCultFaction extends BaseFaction {
  private viralThreshold = 50; // Attention threshold for viral effects
  private trendingTopics: string[] = [];

  constructor() {
    const definition: FactionDefinition = {
      id: 'influencer-cult',
      name: 'The Influencer Cult',
      description: 'Masters of viral marketing and social manipulation. They weaponize attention and trending topics to convert territories through pure charisma.',
      satiricalTarget: 'Social media influencers and viral marketing culture',
      color: '#FF6B9D', // Hot pink
      abilities: [
        {
          id: 'go-viral',
          name: 'Go Viral',
          description: 'Amplify influence actions with viral spreading mechanics',
          type: 'active',
          cooldown: 2,
          cost: { wealth: 5, attention: 40, technology: 0 },
        },
        {
          id: 'trend-hijack',
          name: 'Trend Hijack',
          description: 'Steal trending topics from other players',
          type: 'reaction',
          cooldown: 3,
          cost: { wealth: 15, attention: 35, technology: 20 },
        },
        {
          id: 'cancel-campaign',
          name: 'Cancel Campaign',
          description: 'Reduce opponent attention through coordinated negative attention',
          type: 'active',
          cooldown: 2,
          cost: { wealth: 0, attention: 30, technology: 15 },
        },
        {
          id: 'influencer-network',
          name: 'Influencer Network',
          description: 'Passive attention generation bonus from controlled territories',
          type: 'passive',
        },
      ],
      victoryPriorities: [
        { type: 'attention-monopoly', description: 'Monopolize global attention' },
        { type: 'cultural-hegemony', description: 'Achieve cultural dominance' },
        { type: 'territorial-domination', description: 'Control majority of territories' },
      ],
      startingResources: {
        wealth: 80,
        attention: 100, // Higher starting attention
        technology: 20,
      },
    };

    super(definition);
  }

  getActionBonus(actionType: ActionType): ActionBonus {
    const multipliers = FACTION_MULTIPLIERS['influencer-cult'];
    
    switch (actionType) {
      case 'influence':
        return {
          multiplier: multipliers.influence_bonus,
          cost: 0.8, // 20% discount on influence actions
          description: 'Viral influence spreading'
        };
      
      case 'go-viral':
        return {
          multiplier: 2.0, // Double effectiveness
          cost: 0.9,
          description: 'Explosive viral growth'
        };

      case 'cancel-campaign':
        return {
          multiplier: 1.3,
          cost: 0.7, // Cheaper for influencers
          description: 'Expert at coordinated cancellation'
        };

      default:
        return { multiplier: 1.0, cost: 1.0 };
    }
  }

  canPerformAction(action: PlayerAction): boolean {
    // Influencer Cult can always perform influence-related actions
    const privilegedActions: ActionType[] = ['influence', 'go-viral', 'cancel-campaign', 'trend-hijack'];
    
    if (privilegedActions.includes(action.type)) {
      return true;
    }

    // For other actions, check if they have enough attention (they rely heavily on attention)
    return action.resources.attention <= action.resources.wealth * 2; // Can trade attention for other actions
  }

  getVictoryPriorities(): VictoryCondition[] {
    return this.definition.victoryPriorities;
  }

  async processAbility(abilityId: string, context: any): Promise<any> {
    switch (abilityId) {
      case 'go-viral':
        return this.processGoViral(context);
      
      case 'trend-hijack':
        return this.processTrendHijack(context);
      
      case 'cancel-campaign':
        return this.processCancelCampaign(context);
      
      case 'influencer-network':
        return this.processInfluencerNetwork(context);
      
      default:
        throw new Error(`Unknown ability: ${abilityId}`);
    }
  }

  /**
   * Go Viral ability - amplifies influence actions
   */
  private async processGoViral(context: any): Promise<any> {
    if (!this.isAbilityAvailable('go-viral', context)) {
      throw new Error('Go Viral ability not available');
    }

    // Viral effect - influence spreads to adjacent territories
    const viralMultiplier = context.attention > this.viralThreshold ? 2.5 : 1.8;
    
    return {
      success: true,
      effects: {
        influenceMultiplier: viralMultiplier,
        spreadToAdjacent: true,
        attentionGenerated: Math.floor(context.baseInfluence * 0.5),
        viralReach: Math.min(3, Math.floor(context.attention / 30)),
      },
      consequences: [
        {
          type: 'narrative-event',
          description: `${context.playerName}'s content goes viral, spreading influence like wildfire!`,
          effects: { attention: +Math.floor(context.baseInfluence * 0.3) }
        }
      ]
    };
  }

  /**
   * Trend Hijack ability - steals trending topics
   */
  private async processTrendHijack(context: any): Promise<any> {
    if (!this.isAbilityAvailable('trend-hijack', context)) {
      throw new Error('Trend Hijack ability not available');
    }

    // Steal trending topics from target player
    const targetPlayer = context.targetPlayer;
    const stolenTopics = context.trendingTopics?.slice(0, 2) || [];
    
    return {
      success: true,
      effects: {
        topicsStolen: stolenTopics,
        attentionStolen: Math.floor(targetPlayer.attention * 0.15),
        influenceBonus: 1.4,
      },
      consequences: [
        {
          type: 'narrative-event',
          description: `${context.playerName} hijacks ${targetPlayer.name}'s trending topics with superior meme game!`,
          effects: { attention: +Math.floor(targetPlayer.attention * 0.15) }
        }
      ]
    };
  }

  /**
   * Cancel Campaign ability - reduces opponent attention
   */
  private async processCancelCampaign(context: any): Promise<any> {
    if (!this.isAbilityAvailable('cancel-campaign', context)) {
      throw new Error('Cancel Campaign ability not available');
    }

    const targetPlayer = context.targetPlayer;
    const attentionReduction = Math.floor(targetPlayer.attention * 0.25);
    
    return {
      success: true,
      effects: {
        attentionReduced: attentionReduction,
        influenceReduced: Math.floor(targetPlayer.influence * 0.15),
        publicOpinionShift: -2,
      },
      consequences: [
        {
          type: 'narrative-event',  
          description: `${context.playerName} orchestrates a devastating cancel campaign against ${targetPlayer.name}!`,
          effects: { attention: -attentionReduction }
        }
      ]
    };
  }

  /**
   * Influencer Network passive ability
   */
  private async processInfluencerNetwork(context: any): Promise<any> {
    const territoriesControlled = context.territories?.length || 0;
    const networkBonus = Math.floor(territoriesControlled * 3);
    
    return {
      success: true,
      effects: {
        passiveAttentionBonus: networkBonus,
        influenceGenerationMultiplier: 1.2,
        viralPotential: Math.min(100, territoriesControlled * 10),
      },
      consequences: []
    };
  }

  /**
   * Check if content can go viral
   */
  canGoViral(attentionLevel: number): boolean {
    return attentionLevel >= this.viralThreshold;
  }

  /**
   * Calculate viral spread radius
   */
  calculateViralSpread(attention: number): number {
    if (attention < this.viralThreshold) return 0;
    return Math.min(4, Math.floor(attention / 25));
  }

  /**
   * Add trending topic
   */
  addTrendingTopic(topic: string): void {
    if (!this.trendingTopics.includes(topic)) {
      this.trendingTopics.push(topic);
      // Keep only the 5 most recent trending topics
      if (this.trendingTopics.length > 5) {
        this.trendingTopics.shift();
      }
    }
  }

  /**
   * Get current trending topics
   */
  getTrendingTopics(): string[] {
    return [...this.trendingTopics];
  }
}