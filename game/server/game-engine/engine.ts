/**
 * Satire Empire - Core Game Engine
 * Main game logic and state management
 */

import { 
  GameState, 
  Player, 
  PlayerAction, 
  ActionResult, 
  ActionResolution,
  GamePhase,
  Territory,
  GameEvent,
  GameConsequence 
} from '../../shared/types/game';
import { GAME_TIMING, RESOURCE_CONFIG, GAME_LIMITS } from '../../shared/constants/gameConfig';

export class GameEngine {
  private gameState: GameState;
  private turnTimer: number | null = null;
  private eventHandlers: Map<string, Function[]> = new Map();

  constructor(initialState?: GameState) {
    if (initialState) {
      this.gameState = initialState;
    } else {
      this.gameState = this.createInitialGameState();
    }
  }

  /**
   * Get current game state (read-only)
   */
  getGameState(): Readonly<GameState> {
    return { ...this.gameState };
  }

  /**
   * Get current game phase
   */
  get currentPhase(): GamePhase {
    return this.gameState.phase;
  }

  /**
   * Get current turn number
   */
  get currentTurn(): number {
    return this.gameState.turn;
  }

  /**
   * Add a player to the game
   */
  addPlayer(player: Player): boolean {
    if (this.gameState.players.length >= GAME_LIMITS.MAX_PLAYERS) {
      return false;
    }

    if (this.gameState.phase !== 'lobby') {
      return false;
    }

    // Check if player ID already exists
    if (this.gameState.players.some(p => p.id === player.id)) {
      return false;
    }

    this.gameState.players.push({
      ...player,
      resources: { ...RESOURCE_CONFIG.STARTING_RESOURCES },
      territories: [],
      actions: [],
      isConnected: true,
      lastActionTime: Date.now(),
    });

    this.emitEvent('playerJoined', { player });
    return true;
  }

  /**
   * Remove a player from the game
   */
  removePlayer(playerId: string): boolean {
    const playerIndex = this.gameState.players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) {
      return false;
    }

    const player = this.gameState.players[playerIndex];
    this.gameState.players.splice(playerIndex, 1);
    
    // Redistribute territories
    this.redistributePlayerTerritories(playerId);
    
    this.emitEvent('playerLeft', { player });
    return true;
  }

  /**
   * Start the game (transition from lobby to playing)
   */
  startGame(): boolean {
    if (this.gameState.phase !== 'lobby') {
      return false;
    }

    if (this.gameState.players.length < GAME_LIMITS.MIN_PLAYERS) {
      return false;
    }

    // Initialize territories for players
    this.initializePlayerTerritories();
    
    // Start first turn
    this.gameState.phase = 'morning-brief';
    this.gameState.turn = 1;
    this.gameState.timeRemaining = GAME_TIMING.MORNING_BRIEF_DURATION;

    this.startPhaseTimer();
    this.emitEvent('gameStarted', { gameState: this.gameState });
    
    return true;
  }

  /**
   * Process a player action
   */
  async processAction(playerId: string, action: PlayerAction): Promise<ActionResult> {
    // Validate action
    const validation = this.validateAction(playerId, action);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const player = this.gameState.players.find(p => p.id === playerId)!;
    
    // Add action to player's queue
    const queuedAction = {
      id: `${playerId}-${Date.now()}`,
      ...action,
      timestamp: Date.now(),
      playerId,
    };

    player.actions.push(queuedAction);
    player.lastActionTime = Date.now();

    this.emitEvent('actionQueued', { playerId, action: queuedAction });
    
    return { success: true };
  }

  /**
   * Advance to the next game phase
   */
  async advancePhase(): Promise<void> {
    switch (this.gameState.phase) {
      case 'morning-brief':
        await this.startActionPhase();
        break;
      case 'action-phase':
        await this.startBreakingNewsPhase();
        break;
      case 'breaking-news':
        await this.startNextTurn();
        break;
    }
  }

  /**
   * Create initial game state
   */
  private createInitialGameState(): GameState {
    return {
      id: `game-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      version: '1.0.0',
      turn: 0,
      phase: 'lobby',
      players: [],
      territories: this.generateTerritories(),
      events: [],
      timeRemaining: 0,
      metadata: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        maxPlayers: GAME_LIMITS.MAX_PLAYERS,
        turnDuration: GAME_TIMING.ACTION_PHASE_DURATION,
        gameMode: 'standard',
      },
    };
  }

  /**
   * Generate initial territories
   */
  private generateTerritories(): Territory[] {
    const territories: Territory[] = [];
    
    // Mock territory generation - in real game, this would be more sophisticated
    const territoryNames = [
      'Silicon Valley', 'Wall Street', 'Hollywood', 'Washington DC',
      'London', 'Tokyo', 'Dubai', 'Singapore',
      'Berlin', 'Paris', 'Sydney', 'Toronto',
      'São Paulo', 'Mumbai', 'Seoul', 'Shanghai',
      'Tel Aviv', 'Stockholm', 'Amsterdam', 'Zurich',
      'Miami', 'Austin', 'Seattle', 'Boston'
    ];

    territoryNames.forEach((name, index) => {
      territories.push({
        id: `territory-${index + 1}`,
        name,
        owner: undefined,
        position: {
          x: (index % 8) * 12.5, // Grid layout for demo
          y: Math.floor(index / 8) * 33.33,
          longitude: -180 + (index % 8) * 45,
          latitude: -60 + Math.floor(index / 8) * 60,
        },
        resources: {
          wealth: 10 + Math.floor(Math.random() * 20),
          attention: 5 + Math.floor(Math.random() * 15),
          technology: 3 + Math.floor(Math.random() * 12),
        },
        influence: {},
        specialProperties: [],
      });
    });

    return territories;
  }

  /**
   * Initialize territories for players at game start
   */
  private initializePlayerTerritories(): void {
    const neutralTerritories = this.gameState.territories.filter(t => !t.owner);
    const territoriesPerPlayer = Math.min(
      RESOURCE_CONFIG.STARTING_TERRITORIES_PER_PLAYER,
      Math.floor(neutralTerritories.length / this.gameState.players.length)
    );

    this.gameState.players.forEach((player, playerIndex) => {
      for (let i = 0; i < territoriesPerPlayer; i++) {
        const territoryIndex = playerIndex * territoriesPerPlayer + i;
        const territory = neutralTerritories[territoryIndex];
        if (territory) {
          territory.owner = player.id;
          player.territories.push(territory.id);
        }
      }
    });
  }

  /**
   * Redistribute territories when a player leaves
   */
  private redistributePlayerTerritories(playerId: string): void {
    this.gameState.territories.forEach(territory => {
      if (territory.owner === playerId) {
        territory.owner = undefined;
        territory.influence = {};
      }
    });
  }

  /**
   * Start the action phase
   */
  private async startActionPhase(): Promise<void> {
    this.gameState.phase = 'action-phase';
    this.gameState.timeRemaining = GAME_TIMING.ACTION_PHASE_DURATION;
    
    // Generate resources for all players
    this.generateResources();
    
    this.startPhaseTimer();
    this.emitEvent('phaseChanged', { 
      phase: 'action-phase', 
      timeRemaining: this.gameState.timeRemaining 
    });
  }

  /**
   * Start the breaking news phase
   */
  private async startBreakingNewsPhase(): Promise<void> {
    this.gameState.phase = 'breaking-news';
    this.gameState.timeRemaining = GAME_TIMING.BREAKING_NEWS_DURATION;

    // Collect and resolve all queued actions
    const actionResults = await this.resolveAllActions();
    
    // Generate headlines and events
    const headlines = this.generateHeadlines(actionResults);
    const events = this.generateEvents(actionResults);
    
    this.gameState.events = events;
    this.updateGameStateFromActions(actionResults);

    this.startPhaseTimer();
    this.emitEvent('breakingNews', { headlines, events, results: actionResults });
  }

  /**
   * Start the next turn
   */
  private async startNextTurn(): Promise<void> {
    this.gameState.turn += 1;
    this.gameState.phase = 'morning-brief';
    this.gameState.timeRemaining = GAME_TIMING.MORNING_BRIEF_DURATION;

    // Clear previous turn's actions
    this.gameState.players.forEach(player => {
      player.actions = [];
    });

    // Check victory conditions
    const winner = this.checkVictoryConditions();
    if (winner) {
      this.endGame(winner);
      return;
    }

    this.startPhaseTimer();
    this.emitEvent('turnStarted', { turn: this.gameState.turn });
  }

  /**
   * Generate resources for all players
   */
  private generateResources(): void {
    this.gameState.players.forEach(player => {
      const territoryResources = this.calculateTerritoryResources(player.id);
      
      player.resources.wealth += territoryResources.wealth;
      player.resources.attention += territoryResources.attention;
      player.resources.technology += territoryResources.technology;
    });
  }

  /**
   * Calculate resources from territories
   */
  private calculateTerritoryResources(playerId: string): { wealth: number; attention: number; technology: number } {
    const playerTerritories = this.gameState.territories.filter(t => t.owner === playerId);
    
    return playerTerritories.reduce((total, territory) => ({
      wealth: total.wealth + territory.resources.wealth,
      attention: total.attention + territory.resources.attention,
      technology: total.technology + territory.resources.technology,
    }), { wealth: 0, attention: 0, technology: 0 });
  }

  /**
   * Resolve all queued actions
   */
  private async resolveAllActions(): Promise<ActionResolution[]> {
    const allActions = this.gameState.players.flatMap(player =>
      player.actions.map(action => ({ ...action, playerId: player.id }))
    );

    const results: ActionResolution[] = [];
    
    for (const action of allActions) {
      const result = await this.resolveAction(action);
      results.push(result);
    }

    return results;
  }

  /**
   * Resolve a single action
   */
  private async resolveAction(action: any): Promise<ActionResolution> {
    const player = this.gameState.players.find(p => p.id === action.playerId);
    
    // Mock action resolution - in real game, this would be more sophisticated
    const result: ActionResult = {
      success: true,
      consequences: [],
    };

    const narrativeEffects = [
      `${player?.name || 'Player'} ${action.type}s with ${action.target}!`
    ];

    return {
      action,
      playerId: action.playerId,
      result,
      narrativeEffects,
    };
  }

  /**
   * Generate satirical headlines from action results
   */
  private generateHeadlines(results: ActionResolution[]): string[] {
    return results.map(result => {
      const player = this.gameState.players.find(p => p.id === result.playerId);
      return `BREAKING: ${player?.name || 'Mystery Player'} Causes Chaos with ${result.action.type.toUpperCase()}!`;
    });
  }

  /**
   * Generate game events from action results
   */
  private generateEvents(results: ActionResolution[]): GameEvent[] {
    return results.map((result, index) => ({
      id: `event-${this.gameState.turn}-${index}`,
      type: 'action-consequence',
      title: `Action Result: ${result.action.type}`,
      description: result.narrativeEffects.join(' '),
      turn: this.gameState.turn,
      effects: result.result.consequences || [],
    }));
  }

  /**
   * Update game state based on action results
   */
  private updateGameStateFromActions(results: ActionResolution[]): void {
    results.forEach(result => {
      const player = this.gameState.players.find(p => p.id === result.playerId);
      if (player && result.action.resources) {
        // Deduct resources used in action
        player.resources.wealth = Math.max(0, player.resources.wealth - result.action.resources.wealth);
        player.resources.attention = Math.max(0, player.resources.attention - result.action.resources.attention);
        player.resources.technology = Math.max(0, player.resources.technology - result.action.resources.technology);
      }
    });
  }

  /**
   * Check victory conditions
   */
  private checkVictoryConditions(): string | null {
    // Mock victory check - implement real victory conditions
    for (const player of this.gameState.players) {
      if (player.territories.length >= Math.ceil(this.gameState.territories.length * 0.6)) {
        return player.id;
      }
    }
    
    return null;
  }

  /**
   * End the game
   */
  private endGame(winnerId: string): void {
    this.gameState.phase = 'finished';
    if (this.turnTimer) {
      clearTimeout(this.turnTimer);
    }
    this.emitEvent('gameEnded', { winner: winnerId });
  }

  /**
   * Validate if a player action is allowed
   */
  private validateAction(playerId: string, action: PlayerAction): { valid: boolean; error?: string } {
    const player = this.gameState.players.find(p => p.id === playerId);
    if (!player) {
      return { valid: false, error: 'Player not found' };
    }

    if (this.gameState.phase !== 'action-phase') {
      return { valid: false, error: 'Not in action phase' };
    }

    if (player.actions.length >= GAME_LIMITS.MAX_ACTIONS_PER_TURN) {
      return { valid: false, error: 'Maximum actions per turn reached' };
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
   * Start phase timer
   */
  private startPhaseTimer(): void {
    if (this.turnTimer) {
      clearTimeout(this.turnTimer);
    }

    this.turnTimer = setTimeout(() => {
      this.advancePhase();
    }, this.gameState.timeRemaining * 1000) as any;
  }

  /**
   * Event system
   */
  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  private emitEvent(event: string, data: any): void {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }
}