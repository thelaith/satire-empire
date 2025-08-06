# **Satire Empire - Game Documentation**

Welcome to the comprehensive documentation for **Satire Empire**, a satirical multiplayer strategy game built for the modern web.

## **📚 Documentation Index**

### **Core Documents**
- **[Game Vision](vision.md)** - High-level concept, design pillars, and gameplay overview
- **[Gameplay Specification](gameplay.md)** - Core mechanics, turn structure, and victory conditions
- **[Technical Architecture Guide](technical.md)** - Complete technical documentation: tech stack, system architecture, project structure, and development workflow
- **[Multiplayer Specification](multiplayer.md)** - Real-time architecture and state management
- **[Asset Specification](assets.md)** - Design system, visual requirements, and component library
- **[Development Roadmap](roadmap.md)** - Phases, milestones, and success metrics
- **[Code Examples](examples.md)** - Implementation patterns and code samples

## **🎮 Quick Overview**

**Satire Empire** is a turn-based multiplayer strategy game where players embody outlandish modern factions (rogue AI, influencer cults, hyper-capitalist corporations) to compete for global influence. The game features:

- **Asymmetric Gameplay:** Each faction has unique abilities that parody real-world institutions
- **Fast-Paced Matches:** 10-20 minute games for 2-8 players
- **Modern Web Platform:** PWA with responsive design for desktop and mobile
- **Neobrutalist Aesthetics:** Bold, satirical visual design
- **Edge-First Performance:** Built on Cloudflare's global network for low latency

## **🏗️ Technical Stack**

- **Frontend:** TypeScript with Neobrutalism Components
- **Backend:** Cloudflare Workers with ES modules and Partykit
- **Database:** Cloudflare Durable Objects & D1
- **Map Engine:** Maplibre GL JS
- **Deployment:** Cloudflare Workers with global CDN
- **PWA:** Service Worker for offline-first experience

## **🎯 Development Status**

The project has completed **Phase 1: Foundation** and is ready for **Phase 2: Core Implementation**:

### **✅ Phase 1 Complete: Foundation**
- ✅ Complete project structure and documentation
- ✅ Technical architecture implementation
- ✅ Core game engine with turn-based mechanics
- ✅ Shared TypeScript type system
- ✅ Faction system foundation (Influencer Cult implemented)
- ✅ Cloudflare Workers backend foundation
- ✅ Frontend application structure with PWA support

### **🔄 Phase 2 Current: Core Implementation**
1. **UI Integration:** Neobrutalism components and game interface
2. **Map System:** Interactive global map with Maplibre GL JS
3. **Multiplayer:** Real-time features with Partykit integration
4. **Complete Game Logic:** Remaining factions and game mechanics

### **📋 Phase 3 Upcoming: Enhanced Experience**
- Advanced UI/UX polish and animations
- Analytics and monitoring systems
- Production deployment and scaling

## **📋 Getting Started**

### **For Developers**
1. **Start Here:** [Technical Architecture Guide](technical.md) - complete technical reference with implemented system architecture and project structure
2. **Get Coding:** Navigate to `game/` folder - fully implemented foundation with TypeScript, game engine, and faction system
3. **Check Progress:** [Development Roadmap](roadmap.md) for current priorities and completed milestones
4. **Understand Systems:** [Multiplayer Specification](multiplayer.md) for real-time features (Partykit integration ready)
5. **Game Mechanics:** [Gameplay Specification](gameplay.md) for core game mechanics (turn-based "News Cycle" implemented)
6. **Code Patterns:** [Code Examples](examples.md) for working implementation patterns and samples

### **Quick Start Development**
```bash
cd game/
npm install
npm run dev  # Starts both client (Vite) and server (Wrangler)
```

### **For Designers**
1. Study the [Asset Specification](assets.md) for design system details
2. Review the [Game Vision](vision.md) for design principles
3. Understand the Neobrutalism aesthetic requirements
4. Reference the [Gameplay Specification](gameplay.md) for UI requirements

### **For Stakeholders**
1. Start with the [Game Vision](vision.md) for high-level understanding
2. Review the [Development Roadmap](roadmap.md) for timeline and milestones
3. Check success metrics and risk mitigation strategies
4. Explore the [Gameplay Specification](gameplay.md) for feature scope

## **🔗 Key Resources**

- **Design System:** Neobrutalism Components library
- **Map Engine:** Maplibre GL JS documentation
- **Backend:** Cloudflare Workers and Partykit
- **Testing:** Vitest for unit tests, Playwright for E2E
- **Performance:** Cloudflare's global edge network

## **📝 Contributing**

This documentation is living and should be updated as the project evolves. Key areas for contribution:

- **Technical Implementation:** Update specs as architecture decisions are made
- **Design System:** Document new components and patterns
- **Game Balance:** Track faction mechanics and balance changes
- **User Feedback:** Integrate insights from playtesting and user research

## **🎨 Design Philosophy**

The game follows five core design pillars:

1. **Satirical Depth Through Asymmetry** - Each faction parodies real-world institutions
2. **Accessible Complexity** - Simple actions with deep strategic interactions
3. **The World is a Stage** - Narrative control as the ultimate weapon
4. **Edge-First Performance** - Built for speed and responsiveness
5. **Single Developer Maintainability** - Clean, understandable codebase

---

*Last updated: [Current Date]*
*Version: 1.0.0* 