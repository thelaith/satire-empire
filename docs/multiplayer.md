# **Multiplayer**

## **1. Real-time Layer: Partykit**

* **Partykit** will be used for all real-time communication between clients and the server.
* It will handle the synchronization of game state, player actions, and chat messages.
* We will leverage Partykit's features for low-latency multiplayer.

## **2. Game State Management**

* The authoritative game state will be held in a **Cloudflare Durable Object**.
* The Durable Object will process game logic and broadcast state changes to all connected clients via Partykit.
* This ensures a single source of truth and consistent state for all players.

## **3. Persistence**

* Player stats, replays, and saved games will be stored in a persistent database (e.g., Cloudflare D1 or KV).
* This data will be associated with a player's account.

## **4. Analytics & Monitoring**

* Structured hooks will be added for analytics and monitoring (e.g., via Logflare or OpenTelemetry).
* These hooks will track key game events, player behavior, and system performance.
* This will be crucial for balancing the game and identifying issues in production.

## **5. Multiplayer Architecture Details**

### **Connection Flow**
1. **Player Joins:** Client connects to Partykit room via WebSocket
2. **Authentication:** Optional player identification and session management
3. **State Sync:** Server sends current game state to new player
4. **Action Processing:** Player actions are sent to Durable Object
5. **State Broadcast:** Updated state is broadcast to all connected players
6. **Reconnection:** Players can reconnect and receive current state
7. **Graceful Disconnect:** Handle player disconnections without disrupting game

### **Game State Structure**
```typescript
interface GameState {
  gameId: string;
  version: string;
  players: Player[];
  currentTurn: number;
  gamePhase: 'lobby' | 'playing' | 'finished';
  board: BoardState;
  events: GameEvent[];
  metadata: GameMetadata;
}

interface Player {
  id: string;
  name: string;
  faction: FactionType;
  resources: ResourceState;
  territories: string[];
  isConnected: boolean;
  lastActionTime: number;
}

interface BoardState {
  territories: Territory[];
  resources: ResourceDistribution;
  events: ActiveEvent[];
  turnTimer: number;
}
```

### **Player Management**
- **Player Identification:** Anonymous sessions with optional account linking
- **Spectator Mode:** Players can watch games without participating
- **Reconnection:** Graceful handling of network disconnections
- **Player Limits:** Configurable player limits per game (2-8 players)

### **Turn Management**
- **Turn Timer:** Configurable time limits for turns (30-120 seconds)
- **Auto-Advance:** Automatic turn progression if player doesn't act
- **Turn Order:** Dynamic turn order based on game events
- **Simultaneous Actions:** Some actions can be performed simultaneously

## **6. Network Optimization**

### **Message Compression**
- **Binary Protocol:** Use efficient binary format for game state updates
- **Delta Updates:** Only send changed state data
- **Batching:** Batch multiple updates into single messages

### **Latency Handling**
- **Client Prediction:** Predict actions locally before server confirmation
- **Rollback System:** Handle prediction errors gracefully
- **Interpolation:** Smooth visual updates between state changes

### **Scalability Considerations**
- **Room Limits:** Maximum players per game room
- **Geographic Distribution:** Route players to nearest edge location
- **Load Balancing:** Distribute game rooms across multiple workers

## **7. Security & Anti-Cheat**

### **Server Authority**
- **Action Validation:** All player actions validated server-side
- **State Verification:** Regular state integrity checks
- **Rate Limiting:** Prevent action spam and abuse

### **Data Protection**
- **Player Privacy:** No personal data stored without consent
- **Game Replays:** Anonymized replay data for analysis
- **Secure Communication:** All WebSocket traffic encrypted

## **8. Monitoring & Debugging**

### **Real-time Metrics**
- **Connection Quality:** Monitor WebSocket connection health
- **Game Performance:** Track turn times and action processing
- **Player Behavior:** Analyze common player patterns

### **Debugging Tools**
- **State Inspector:** Real-time game state visualization
- **Event Logger:** Comprehensive event logging for debugging
- **Performance Profiler:** Identify bottlenecks in game logic

## **9. Error Handling & Recovery**

### **9.1. Network Issues**
- **Connection Loss:** Automatic reconnection with state recovery
- **High Latency:** Graceful degradation of real-time features
- **Packet Loss:** Retry mechanisms for critical game actions
- **Server Failures:** Failover to backup instances

### **9.2. Game State Recovery**
- **State Corruption:** Automatic state validation and repair
- **Action Conflicts:** Resolution of simultaneous conflicting actions
- **Desync Detection:** Identify and correct state inconsistencies
- **Rollback Mechanisms:** Revert to last known good state

### **9.3. Player Experience**
- **Loading States:** Clear feedback during connection issues
- **Error Messages:** User-friendly error descriptions
- **Recovery Options:** Manual reconnection and state refresh
- **Fallback Modes:** Offline practice mode when disconnected 