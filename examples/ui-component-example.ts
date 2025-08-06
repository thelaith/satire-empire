/**
 * Satire Empire - UI Component Examples
 * Neobrutalism design patterns and game UI components
 */

// Mock React types for the example
type ReactNode = any;
type ReactElement = any;

interface FC<P = {}> {
  (props: P & { children?: ReactNode }): ReactElement | null;
}

// Mock React functions
function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void] {
  return [initial, (() => {}) as any];
}

function useEffect(effect: () => void, deps?: any[]): void {
  // Mock implementation
}

// React namespace for compatibility
namespace React {
  export type ReactNode = any;
  export type ReactElement = any;
  export interface Dispatch<A> {
    (value: A): void;
  }
  export type SetStateAction<S> = S | ((prevState: S) => S);
}

// Mock cn function
function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Game Types
interface GameState {
  turn: number;
  phase: 'morning-brief' | 'action-phase' | 'breaking-news';
  timeRemaining: number;
  territories: Territory[];
  events: GameEvent[];
  players: Player[];
}

interface Player {
  id: string;
  name: string;
  resources: Resources;
}

interface Territory {
  id: string;
  name: string;
  owner?: string;
  resources: Resources;
}

interface Resources {
  wealth: number;
  attention: number;
  technology: number;
}

interface GameEvent {
  id: string;
  type: string;
  description: string;
  timestamp: number;
}

interface PlayerAction {
  type: ActionType;
  target: string;
  resources: Resources;
}

type ActionType = 'invest' | 'influence' | 'invade';
type FactionType = 'influencer-cult' | 'rogue-ai' | 'hyper-capitalist';

// Component Props
interface GameBoardProps {
  gameState: GameState;
  currentPlayer: Player;
  onActionSubmit: (action: PlayerAction) => void;
}

interface NeoBrutalButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

interface ActionPanelProps {
  player: Player;
  selectedTerritory: string | null;
  onActionQueue: (action: PlayerAction) => void;
  onActionSubmit: () => void;
}

interface NewsTickerProps {
  headlines: string[];
}

interface TerritoryMarkerProps {
  territory: Territory;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (id: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface TurnTimerProps {
  timeRemaining: number;
  totalTime: number;
  phase: string;
  onTimeUp: () => void;
}

// Mock Components for the example
const GameHeader: FC<{ turn: number; phase: string; timeRemaining: number }> = () => ({ type: 'div', props: { children: 'Game Header' } });
const InteractiveMap: FC<{ territories: Territory[]; selectedTerritory: string | null; onTerritorySelect: (id: string) => void }> = () => ({ type: 'div', props: { children: 'Interactive Map' } });
const ResourceDisplay: FC<{ resources: Resources }> = () => ({ type: 'div', props: { children: 'Resource Display' } });
const EventFeed: FC<{ events: GameEvent[] }> = () => ({ type: 'div', props: { children: 'Event Feed' } });
const PlayerList: FC<{ players: Player[] }> = () => ({ type: 'div', props: { children: 'Player List' } });
const ResourceSlider: FC<{ label: string; value: number; max: number; onChange: (value: number) => void }> = () => ({ type: 'div', props: { children: 'Resource Slider' } });

// Game Board Component Example
export const GameBoard: FC<GameBoardProps> = ({
  gameState,
  currentPlayer,
  onActionSubmit,
}) => {
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(null);
  const [queuedAction, setQueuedAction] = useState<PlayerAction | null>(null);

  return (
    <div className="game-board w-full h-screen bg-yellow-100 border-8 border-black">
      {/* Game Header */}
      <GameHeader 
        turn={gameState.turn}
        phase={gameState.phase}
        timeRemaining={gameState.timeRemaining}
      />

      {/* Main Game Area */}
      <div className="flex h-full">
        {/* Map Panel */}
        <div className="flex-1 relative">
          <InteractiveMap
            territories={gameState.territories}
            selectedTerritory={selectedTerritory}
            onTerritorySelect={setSelectedTerritory}
          />
        </div>

        {/* Action Panel */}
        <div className="w-96 bg-white border-l-8 border-black p-6">
          <ActionPanel
            player={currentPlayer}
            selectedTerritory={selectedTerritory}
            onActionQueue={setQueuedAction}
            onActionSubmit={onActionSubmit}
          />
        </div>
      </div>

      {/* Bottom UI */}
      <div className="h-32 bg-red-400 border-t-8 border-black flex">
        <ResourceDisplay resources={currentPlayer.resources} />
        <EventFeed events={gameState.events.slice(-3)} />
        <PlayerList players={gameState.players} />
      </div>
    </div>
  );
};

// Neobrutalism Button Component
export const NeoBrutalButton: FC<NeoBrutalButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className,
}) => {
  const baseClasses = cn(
    // Base styling
    'font-bold uppercase tracking-wide border-4 border-black',
    'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    'transition-all duration-150 ease-out',
    
    // Interactive states
    'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    'hover:translate-x-[2px] hover:translate-y-[2px]',
    'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0 hover:translate-y-0',
    
    className
  );

  const variantClasses = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-300',
    secondary: 'bg-blue-400 text-black hover:bg-blue-300', 
    danger: 'bg-red-400 text-black hover:bg-red-300',
    success: 'bg-green-400 text-black hover:bg-green-300',
  };

  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size])}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Action Panel Component
export const ActionPanel: FC<ActionPanelProps> = ({
  player,
  selectedTerritory,
  onActionQueue,
  onActionSubmit,
}) => {
  const [selectedAction, setSelectedAction] = useState<ActionType>('invest');
  const [resourceAllocation, setResourceAllocation] = useState<Resources>({
    wealth: 0,
    attention: 0,
    technology: 0,
  });

  const canAffordAction = () => {
    return player.resources.wealth >= resourceAllocation.wealth &&
           player.resources.attention >= resourceAllocation.attention &&
           player.resources.technology >= resourceAllocation.technology;
  };

  const handleSubmitAction = () => {
    if (!selectedTerritory || !canAffordAction()) return;

    const action: PlayerAction = {
      type: selectedAction,
      target: selectedTerritory,
      resources: resourceAllocation,
    };

    onActionQueue(action);
  };

  return (
    <div className="action-panel space-y-6">
      <div className="bg-white border-4 border-black p-4">
        <h2 className="text-2xl font-bold mb-4">ACTIONS</h2>
        
        {/* Action Type Selection */}
        <div className="space-y-2 mb-6">
          {(['invest', 'influence', 'invade'] as ActionType[]).map((actionType) => (
            <NeoBrutalButton
              key={actionType}
              variant={selectedAction === actionType ? 'primary' : 'secondary'}
              onClick={() => setSelectedAction(actionType)}
              className="w-full"
            >
              {actionType.toUpperCase()}
            </NeoBrutalButton>
          ))}
        </div>

        {/* Resource Allocation */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">RESOURCE ALLOCATION</h3>
          
          <ResourceSlider
            label="WEALTH"
            value={resourceAllocation.wealth}
            max={player.resources.wealth}
            onChange={(value) => setResourceAllocation(prev => ({ ...prev, wealth: value }))}
          />
          
          <ResourceSlider
            label="ATTENTION"
            value={resourceAllocation.attention}
            max={player.resources.attention}
            onChange={(value) => setResourceAllocation(prev => ({ ...prev, attention: value }))}
          />
          
          <ResourceSlider
            label="TECHNOLOGY"
            value={resourceAllocation.technology}
            max={player.resources.technology}
            onChange={(value) => setResourceAllocation(prev => ({ ...prev, technology: value }))}
          />
        </div>

        {/* Submit Button */}
        <NeoBrutalButton
          variant="success"
          size="large"
          disabled={!selectedTerritory || !canAffordAction()}
          onClick={handleSubmitAction}
          className="w-full mt-6"
        >
          QUEUE ACTION
        </NeoBrutalButton>
      </div>
    </div>
  );
};

// Satirical News Ticker Component
export const NewsTicker: FC<NewsTickerProps> = ({ headlines }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [headlines.length]);

  if (headlines.length === 0) return null;

  return (
    <div className="news-ticker bg-black text-yellow-400 border-y-4 border-yellow-400 py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-lg font-bold">
        🔥 BREAKING: {headlines[currentIndex]?.text} 🔥
      </div>
    </div>
  );
};

// Map Territory Component
export const TerritoryMarker: FC<TerritoryMarkerProps> = ({
  territory,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getOwnerColor = () => {
    if (!territory.owner) return 'bg-gray-300';
    
    const colors = {
      'influencer-cult': 'bg-pink-400',
      'rogue-ai': 'bg-blue-400',
      'hyper-capitalist': 'bg-green-400',
    };
    
    return colors[territory.owner as FactionType] || 'bg-gray-400';
  };

  return (
    <div
      className={cn(
        'territory-marker absolute transform -translate-x-1/2 -translate-y-1/2',
        'w-8 h-8 border-2 border-black cursor-pointer',
        'transition-all duration-200',
        getOwnerColor(),
        isSelected && 'ring-4 ring-yellow-400 scale-125',
        isHovered && 'scale-110 shadow-lg',
        'hover:z-10'
      )}
      onClick={() => onClick(territory.id)}
      onMouseEnter={() => onMouseEnter(territory.id)}
      onMouseLeave={() => onMouseLeave()}
      style={{
        left: `${territory.position.x}%`,
        top: `${territory.position.y}%`,
      }}
    >
      {/* Territory Icon */}
      <div className="w-full h-full flex items-center justify-center text-xs font-bold">
        {territory.name.charAt(0)}
      </div>
      
      {/* Resource Indicators */}
      <div className="absolute -top-2 -right-2 flex space-x-1">
        {territory.resources.wealth > 0 && (
          <div className="w-2 h-2 bg-yellow-400 border border-black rounded-full" />
        )}
        {territory.resources.attention > 0 && (
          <div className="w-2 h-2 bg-red-400 border border-black rounded-full" />
        )}
        {territory.resources.technology > 0 && (
          <div className="w-2 h-2 bg-blue-400 border border-black rounded-full" />
        )}
      </div>
    </div>
  );
};

// Game Timer Component
export const TurnTimer: FC<TurnTimerProps> = ({
  timeRemaining,
  totalTime,
  phase,
  onTimeUp,
}) => {
  const percentage = (timeRemaining / totalTime) * 100;
  
  const getPhaseColor = () => {
    switch (phase) {
      case 'morning-brief': return 'bg-blue-400';
      case 'action-phase': return 'bg-green-400';
      case 'breaking-news': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="turn-timer bg-white border-4 border-black p-4">
      <div className="text-center mb-2">
        <div className="text-lg font-bold uppercase">{phase.replace('-', ' ')}</div>
        <div className="text-2xl font-mono">{formatTime(timeRemaining)}</div>
      </div>
      
      <div className="relative h-4 bg-gray-200 border-2 border-black">
        <div
          className={cn('absolute top-0 left-0 h-full transition-all duration-1000', getPhaseColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {timeRemaining <= 10 && (
        <div className="mt-2 text-center text-red-600 font-bold animate-pulse">
          TIME RUNNING OUT!
        </div>
      )}
    </div>
  );
};