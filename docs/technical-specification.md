# **Technical Specification**

## **1. Architecture Overview**

The game follows a client-server architecture, built on Cloudflare's serverless platform for performance and scalability.

* **Frontend:**
    * **UI:** Neobrutalism Components
    * **Map:** Maplibre GL JS
    * **Framework:** TypeScript with modern ES modules for optimal performance and type safety.
* **Backend:**
    * **Game Logic & API:** Cloudflare Workers
    * **Multiplayer State:** Partykit
    * **Persistence:** Cloudflare Durable Objects for game state and player data.

## **2. Frontend**

* **PWA Support:** The application will be a Progressive Web App, with a service worker for offline-first features and installability. Cloudflare Workers will use ES modules for better execution context reuse across multiple requests.
* **Responsive Design:** The UI will be fully responsive, adapting to both mobile and desktop screens. Touch-optimized controls are a priority.
* **State Management:** Global and game state will be managed in a simple, centralized store, with state synced from the backend via Partykit.

## **3. Backend**

* **Edge-First:** All backend logic will run on Cloudflare's edge network for low latency.
* **Fast Cold Start:** Cloudflare Workers provide near-instant cold starts.
* **Modularity:** Game logic, UI, map, and multiplayer will be in isolated files/modules for maintainability.

## **4. Replay & Logging System**

* Every game action will be a structured, loggable event.
* These events will be stored and can be used to replay any game session.
* Replays will be shareable via a unique URL.

## **5. AI Bot Support**

* The architecture will include hooks for adding AI agents.
* These agents can be used for playtesting, offline play, or filling empty player slots.

## **6. Versioning**

* Game rules and faction data will be versioned to ensure backward compatibility for replays.

## **7. TypeScript Architecture**

### **7.1. Type Safety Strategy**
- **Strict Configuration:** Enable all strict TypeScript flags
- **Shared Types:** Common type definitions across frontend and backend
- **API Contracts:** Type-safe interfaces for all API endpoints
- **Runtime Validation:** Zod schemas for runtime type checking

### **7.2. Module Structure**
- **ES Modules:** All code uses ES modules for optimal performance
- **Barrel Exports:** Clean import/export patterns
- **Tree Shaking:** Unused code elimination for smaller bundles
- **Type-Only Imports:** Separate type imports from runtime code

### **7.3. Development Experience**
- **IDE Integration:** Full IntelliSense and refactoring support
- **Error Prevention:** Compile-time error catching
- **Documentation:** Auto-generated type documentation
- **Testing:** Type-safe test utilities and mocks

## **8. Development Stack**

### **Frontend Technologies**
- **Framework:** TypeScript with ES modules
- **UI Library:** Neobrutalism Components
- **Map Engine:** Maplibre GL JS
- **Build Tool:** Vite with TypeScript support
- **PWA:** Service Worker for offline capabilities
- **Type Safety:** Full TypeScript coverage for all components

### **Backend Technologies**
- **Runtime:** Cloudflare Workers with ES modules
- **Real-time:** Partykit for multiplayer
- **Database:** Cloudflare D1 for structured data
- **Storage:** Cloudflare KV for session data
- **CDN:** Cloudflare's global network
- **Type Safety:** TypeScript for all backend logic

### **Development Tools**
- **Version Control:** Git with conventional commits
- **Testing:** Vitest for unit tests, Playwright for E2E
- **Linting:** ESLint with TypeScript support
- **Formatting:** Prettier for consistent code style
- **Documentation:** Markdown with auto-generated API docs
- **Type Checking:** Strict TypeScript configuration
- **Build System:** ES modules for optimal Cloudflare Workers performance 