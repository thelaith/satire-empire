/**
 * Satire Empire - Client Entry Point
 * Main TypeScript application initialization
 */

import { GameClient } from './services/gameClient';
import { UIManager } from './components/ui/UIManager';
import { InputHandler } from './utils/inputHandler';
import './styles/main.css';

// Application state interface
interface AppState {
  gameClient: GameClient;
  uiManager: UIManager;
  inputHandler: InputHandler;
  isInitialized: boolean;
}

// Global app state
let app: AppState;

/**
 * Initialize the game application
 */
async function initializeApp(): Promise<void> {
  try {
    console.log('🎮 Initializing Satire Empire...');

    // Initialize core systems
    const gameClient = new GameClient();
    const uiManager = new UIManager();
    const inputHandler = new InputHandler();

    // Set up event handlers
    setupEventHandlers(gameClient, uiManager, inputHandler);

    // Initialize UI
    await uiManager.initialize();
    
    // Set up input handling
    inputHandler.initialize();

    // Create app state
    app = {
      gameClient,
      uiManager,
      inputHandler,
      isInitialized: true,
    };

    // Show main menu
    uiManager.showMainMenu();

    console.log('✅ Satire Empire initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Satire Empire:', error);
    showFatalError('Failed to initialize game. Please refresh and try again.');
  }
}

/**
 * Set up event handlers between systems
 */
function setupEventHandlers(
  gameClient: GameClient,
  uiManager: UIManager,
  inputHandler: InputHandler
): void {
  // Game client events
  gameClient.on('gameStateUpdate', (gameState) => {
    uiManager.updateGameState(gameState);
  });

  gameClient.on('connectionLost', () => {
    uiManager.showConnectionLost();
  });

  gameClient.on('error', (error) => {
    uiManager.showError(error.message);
  });

  // UI events
  uiManager.on('createGame', async (config) => {
    try {
      await gameClient.createGame(config);
    } catch (error) {
      uiManager.showError('Failed to create game');
    }
  });

  uiManager.on('joinGame', async (gameId, playerName, faction) => {
    try {
      await gameClient.joinGame(gameId, playerName, faction);
    } catch (error) {
      uiManager.showError('Failed to join game');
    }
  });

  uiManager.on('submitAction', async (action) => {
    try {
      await gameClient.submitAction(action);
    } catch (error) {
      uiManager.showError('Failed to submit action');
    }
  });

  // Input events
  inputHandler.on('keypress', (key) => {
    uiManager.handleKeypress(key);
  });

  inputHandler.on('territoryClick', (territoryId) => {
    uiManager.selectTerritory(territoryId);
  });
}

/**
 * Show fatal error to user
 */
function showFatalError(message: string): void {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'fatal-error';
  errorContainer.innerHTML = `
    <div class="error-content">
      <h1>🚫 Game Error</h1>
      <p>${message}</p>
      <button onclick="location.reload()">Reload Game</button>
    </div>
  `;
  document.body.appendChild(errorContainer);
}

/**
 * Clean up resources on page unload
 */
function cleanup(): void {
  if (app?.isInitialized) {
    app.gameClient.disconnect();
    app.inputHandler.cleanup();
    console.log('🧹 Game resources cleaned up');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Clean up on page unload
window.addEventListener('beforeunload', cleanup);
window.addEventListener('unload', cleanup);

// Hot module replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(cleanup);
}