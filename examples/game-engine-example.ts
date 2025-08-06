/**
 * Satire Empire - Game Engine Example
 * Demonstrates core game engine patterns and TypeScript structure
 */

// Additional Type Definitions
interface GameEvent {
  id: string;
  type: string;
  description: string;
  turn: number;
  effects: any[];
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
  timestamp: number;
}

interface PlayerAction {
  type: ActionType;
  target: string;
  resources: Resources;
}

interface ActionResult {
  success: boolean;
  error?: string;
  consequences?: GameConsequence[];
}

interface ActionResolution {
  action: PlayerAction;
  playerId: string;
  result: ActionResult;
  narrativeEffects: string[];
}

interface GameConsequence {
  type: string;
  description: string;
  effects: any;
}

interface ActionBonus {
  multiplier: number;
  cost: number;
}

interface VictoryCondition {
  type: string;
  description: string;
  progress?: number;
}

// Mock PartySocket for multiplayer example
class PartySocket {
  private eventHandlers: { [key: string]: (event: any) => void } = {};

  constructor(config: { host: string; room: string; id: string }) {
    // Mock implementation
  }

  set onmessage(handler: (event: MessageEvent) => void) {
    this.eventHandlers['message'] = handler;
  }

  send(data: string): void {
    // Mock implementation
  }
}

type ActionType = 'invest' | 'influence' | 'invade' | 'go-viral' | 'cancel-campaign' | 'trend-hijack';

// Shared Types Example
export interface GameState {
  id: string;
  turn: number;
  phase: GamePhase;
  players: Player[];
  territories: Territory[];
  events: GameEvent[];
  timeRemaining: number;
}

export interface Player {
  id: string;
  name: string;
  faction: FactionType;
  resources: Resources;
  territories: string[];
  actions: QueuedAction[];
}

export interface Territory {
  id: string;
  name: string;
  owner?: string;
  resources: Resources;
  influence: Record<string, number>;
  specialProperties: string[];
}

export type GamePhase = 'morning-brief' | 'action-phase' | 'breaking-news';
export type FactionType = 'influencer-cult' | 'rogue-ai' | 'hyper-capitalist';

// Game Engine Core
export class GameEngine {
  private state: GameState;
  private eventEmitter: EventTarget;

  constructor(initialState: GameState) {
    this.state = initialState;
    this.eventEmitter = new EventTarget();
  }

  /**
   * Process a player action during the action phase
   */
  async processAction(playerId: string, action: PlayerAction): Promise<ActionResult> {
    // Validate action is allowed
    const validationResult = this.validateAction(playerId, action);
    if (!validationResult.valid) {
      return { success: false, error: validationResult.error };
    }

    // Queue action for simultaneous resolution
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) {
      return { success: false, error: 'Player not found' };
    }

    player.actions.push({
      type: action.type,
      target: action.target,
      resources: action.resources,
      timestamp: Date.now(),
    });

    // Emit action queued event
    this.emitEvent('action-queued', { playerId, action });

    return { success: true };
  }

  /**
   * Advance to next game phase
   */
  async advancePhase(): Promise<void> {
    switch (this.state.phase) {
      case 'morning-brief':
        await this.startActionPhase();
        break;
      case 'action-phase':
        await this.resolveBreakingNews();
        break;
      case 'breaking-news':
        await this.startNextTurn();
        break;
    }
  }

  /**
   * Resolve all queued actions simultaneously
   */
  private async resolveBreakingNews(): Promise<void> {
    this.state.phase = 'breaking-news';

    // Collect all queued actions
    const allActions = this.state.players.flatMap(player => 
      player.actions.map(action => ({ ...action, playerId: player.id }))
    );

    // Sort by timestamp for fair resolution
    allActions.sort((a, b) => a.timestamp - b.timestamp);

    // Resolve each action
    const results: ActionResolution[] = [];
    for (const action of allActions) {
      const result = await this.resolveAction(action);
      results.push(result);
    }

    // Generate satirical headlines
    const headlines = this.generateHeadlines(results);
    
    // Update game state
    this.updateGameState(results);

    // Clear action queues
    this.state.players.forEach(player => {
      player.actions = [];
    });

    // Emit breaking news event
    this.emitEvent('breaking-news', { results, headlines });
  }

  private emitEvent(type: string, data: any): void {
    this.eventEmitter.dispatchEvent(new CustomEvent(type, { detail: data }));
  }

  /**
   * Validate if a player action is allowed
   */
  private validateAction(playerId: string, action: PlayerAction): { valid: boolean; error?: string } {
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) {
      return { valid: false, error: 'Player not found' };
    }

    // Check if player has enough resources
    if (action.resources.wealth > player.resources.wealth ||
        action.resources.attention > player.resources.attention ||
        action.resources.technology > player.resources.technology) {
      return { valid: false, error: 'Insufficient resources' };
    }

    return { valid: true };
  }

  /**
   * Start the action phase
   */
  private async startActionPhase(): Promise<void> {
    this.state.phase = 'action-phase';
    this.state.timeRemaining = 120; // 2 minutes
    this.emitEvent('phase-started', { phase: 'action-phase' });
  }

  /**
   * Start the next turn
   */
  private async startNextTurn(): Promise<void> {
    this.state.turn += 1;
    this.state.phase = 'morning-brief';
    this.state.timeRemaining = 45; // 45 seconds
    this.emitEvent('turn-started', { turn: this.state.turn });
  }

  /**
   * Resolve a single action
   */
  private async resolveAction(queuedAction: any): Promise<ActionResolution> {
    // Mock implementation for action resolution
    const player = this.state.players.find(p => p.id === queuedAction.playerId);
    return {
      action: queuedAction,
      playerId: queuedAction.playerId,
      result: { success: true },
      narrativeEffects: [`${player?.name || queuedAction.playerId} performed ${queuedAction.type}`],
    };
  }

  /**
   * Generate satirical headlines from action results
   */
  private generateHeadlines(results: ActionResolution[]): string[] {
    return results.map(result => {
      const player = this.state.players.find(p => p.id === result.playerId);
      return `BREAKING: ${player?.name || 'Player'} ${result.action.type}s with massive impact!`;
    });
  }

  /**
   * Update game state based on action results
   */
  private updateGameState(results: ActionResolution[]): void {
    // Mock implementation for state updates
    results.forEach(result => {
      const player = this.state.players.find(p => p.id === result.playerId);
      if (player && result.action.resources) {
        // Deduct resources used in action
        player.resources.wealth = Math.max(0, player.resources.wealth - result.action.resources.wealth);
        player.resources.attention = Math.max(0, player.resources.attention - result.action.resources.attention);
        player.resources.technology = Math.max(0, player.resources.technology - result.action.resources.technology);
      }
    });
  }
}

// Faction System Example
export abstract class Faction {
  abstract readonly type: FactionType;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly uniqueActions: string[];

  /**
   * Get faction-specific bonuses for an action
   */
  abstract getActionBonus(action: PlayerAction): ActionBonus;

  /**
   * Check if faction can perform a specific action
   */
  abstract canPerformAction(action: PlayerAction, player: Player): boolean;

  /**
   * Get faction's victory condition priority
   */
  abstract getVictoryPriority(): VictoryCondition[];
}

export class InfluencerCultFaction extends Faction {
  readonly type: FactionType = 'influencer-cult';
  readonly name = 'The Influencer Cult';
  readonly description = 'Masters of viral marketing and social manipulation';
  readonly uniqueActions = ['go-viral', 'cancel-campaign', 'trend-hijack'];

  getActionBonus(action: PlayerAction): ActionBonus {
    switch (action.type) {
      case 'influence':
        return { multiplier: 1.5, cost: 0.8 }; // 50% more effective, 20% cheaper
      case 'go-viral':
        return { multiplier: 2.0, cost: 1.2 }; // Unique action
      default:
        return { multiplier: 1.0, cost: 1.0 };
    }
  }

  canPerformAction(action: PlayerAction, player: Player): boolean {
    if (action.type === 'go-viral') {
      return player.resources.attention >= 10;
    }
    return true;
  }

  getVictoryPriority(): VictoryCondition[] {
    return [
      { type: 'cultural-hegemony', description: 'Achieve cultural dominance' },
      { type: 'attention-monopoly', description: 'Monopolize global attention' },
      { type: 'territorial-domination', description: 'Control majority of territories' },
    ];
  }
}

// Multiplayer Integration Example
export class MultiplayerSync {
  private partykit: PartySocket;
  private gameEngine: GameEngine;
  private playerId: string;

  constructor(gameId: string, playerId: string) {
    this.playerId = playerId;
    this.partykit = new PartySocket({
      host: 'localhost:1999', // Partykit development server
      room: gameId,
      id: playerId,
    });

    this.setupEventHandlers();
  }

  /**
   * Send player action to other players
   */
  async sendAction(action: PlayerAction): Promise<void> {
    // Optimistic update locally
    await this.gameEngine.processAction(this.playerId, action);

    // Send to server for validation and sync
    this.partykit.send(JSON.stringify({
      type: 'player-action',
      action,
      timestamp: Date.now(),
    }));
  }

  private setupEventHandlers(): void {
    this.partykit.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      switch (message.type) {
        case 'game-state-update':
          this.handleGameStateUpdate(message.state);
          break;
        case 'player-joined':
          this.handlePlayerJoined(message.player);
          break;
        case 'breaking-news':
          this.handleBreakingNews(message.results, message.headlines);
          break;
      }
    };
  }

  private handleGameStateUpdate(state: GameState): void {
    // Update local game engine with server state
    this.gameEngine = new GameEngine(state);
    console.log('Game state updated from server:', state);
  }

  private handlePlayerJoined(player: Player): void {
    console.log('Player joined:', player.name);
  }

  private handleBreakingNews(results: ActionResolution[], headlines: string[]): void {
    console.log('Breaking news:', headlines);
    console.log('Action results:', results);
  }
}