# Satire Empire

A satirical, turn-based multiplayer strategy game where players embody outlandish modern factions to compete for global influence. Built for the modern web with a unique Neobrutalist aesthetic.

## 🎮 Game Overview

**Satire Empire** is a web-first multiplayer strategy game where players take on the role of absurd modern factions (rogue AI, influencer cults, hyper-capitalist corporations) competing for global dominance. Each turn represents a day in the global news cycle, where players compete to make headlines and shape the narrative.

### **Core Features**
- **Asymmetric Gameplay**: Each faction has unique abilities that parody real-world institutions
- **Fast-Paced Matches**: 10-20 minute games for 2-8 players
- **Modern Web Platform**: PWA with responsive design for desktop and mobile
- **Neobrutalist Aesthetics**: Bold, satirical visual design
- **Edge-First Performance**: Built on Cloudflare's global network for low latency

## 🏗️ Project Structure

```
Satire Empire/
├── agents/                    # AI agents for development assistance
│   ├── categories/
│   │   ├── 01-core-development/     # Backend, Frontend, Fullstack, etc.
│   │   ├── 02-language-specialists/ # Python, JavaScript, Rust, etc.
│   │   ├── 03-infrastructure/       # Cloud, DevOps, Security, etc.
│   │   ├── 04-quality-security/     # Testing, Security, QA, etc.
│   │   ├── 05-data-ai/             # AI/ML, Data Science, etc.
│   │   ├── 06-developer-experience/ # DX, Tooling, Documentation, etc.
│   │   ├── 07-specialized-domains/  # Blockchain, Gaming, IoT, etc.
│   │   ├── 08-business-product/     # Product, Business, UX, etc.
│   │   ├── 09-meta-orchestration/   # Multi-agent coordination
│   │   └── 10-research-analysis/    # Research, Analysis, etc.
├── docs/                     # Game documentation and specifications
│   ├── assets.md             # Design system and visual requirements
│   ├── gameplay.md           # Core game mechanics and systems
│   ├── multiplayer.md        # Multiplayer architecture and networking
│   ├── technical.md          # Technical architecture and stack
│   ├── vision.md             # Game vision and high-level concept
│   └── examples.md           # Code examples and patterns
├── examples/                 # Code examples and patterns
│   ├── game-engine-example.ts       # Game engine patterns
│   ├── ui-component-example.tsx     # UI components with Neobrutalism
│   ├── cloudflare-workers-example.ts # Backend patterns
│   └── ui-component-example.ts      # TypeScript UI examples
├── game/ ⭐                  # MAIN GAME IMPLEMENTATION
│   ├── client/              # Frontend TypeScript application
│   │   ├── components/      # Game UI components (to be implemented)
│   │   ├── services/        # Client services (to be implemented)
│   │   ├── stores/          # State management (to be implemented)
│   │   ├── utils/           # Client utilities (to be implemented)
│   │   ├── main.ts          # ✅ App entry point
│   │   ├── index.html       # ✅ PWA-ready HTML template
│   │   └── vite.config.ts   # ✅ Vite build configuration
│   ├── server/              # Cloudflare Workers backend
│   │   ├── api/             # API endpoints (to be implemented)
│   │   ├── game-engine/     # ✅ Core game logic
│   │   │   ├── actions/     # Player actions (to be implemented)
│   │   │   ├── events/      # Game events (to be implemented)
│   │   │   ├── factions/    # ✅ Faction system with Influencer Cult
│   │   │   └── engine.ts    # ✅ Main game engine
│   │   ├── multiplayer/     # Real-time features (to be implemented)
│   │   ├── persistence/     # Data storage (to be implemented)
│   │   ├── worker.ts        # ✅ Cloudflare Workers entry point
│   │   └── wrangler.toml    # ✅ Cloudflare configuration
│   ├── shared/              # ✅ Shared TypeScript code
│   │   ├── types/           # ✅ Complete type definitions
│   │   │   ├── game.ts      # ✅ Game state and player types
│   │   │   ├── faction.ts   # ✅ Faction system types
│   │   │   └── api.ts       # ✅ API contract types
│   │   ├── constants/       # ✅ Game configuration
│   │   │   └── gameConfig.ts # ✅ Balance and timing constants
│   │   └── index.ts         # ✅ Barrel exports
│   ├── package.json         # ✅ Game dependencies and scripts
│   └── README.md            # ✅ Game development guide
├── template/                # Template system for project generation
│   ├── use-cases/
│   │   ├── mcp-server/      # Model Context Protocol server examples
│   │   ├── pydantic-ai/     # Pydantic AI agent examples
│   │   └── template-generator/
├── ui/                      # Neobrutalism UI component library
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── app/            # Next.js app structure
│   │   └── ...
├── ROADMAP.md               # ⭐ Development phases and milestones
├── WORKFLOW_GUIDE.md        # ⭐ AI development workflow and context engineering
└── .cursorrules             # ⭐ AI assistant rules and development standards
```

**✅ = Implemented | 🔄 = In Progress | ⭐ = Core Focus**

## 📚 Documentation Index

### **Core Documents**
- **[Game Vision](docs/vision.md)** - High-level concept, design pillars, and gameplay overview
- **[Gameplay Specification](docs/gameplay.md)** - Core mechanics, turn structure, and victory conditions
- **[Technical Architecture Guide](docs/technical.md)** - Complete technical documentation: tech stack, system architecture, project structure, and development workflow
- **[Multiplayer Specification](docs/multiplayer.md)** - Real-time architecture and state management
- **[Asset Specification](docs/assets.md)** - Design system, visual requirements, and component library
- **[Development Roadmap](ROADMAP.md)** - Phases, milestones, and success metrics
- **[Code Examples](docs/examples.md)** - Implementation patterns and code samples

## 🎯 Game Design

### **Core Gameplay Loop: "The News Cycle"**
Each turn represents a single day in the global news cycle:
1. **Morning Brief (45s)**: World events and resource generation
2. **Action Phase (90-120s)**: Players queue actions simultaneously
3. **Breaking News Resolution (45s)**: Actions resolve with dramatic presentation

### **Victory Conditions**
- **Territorial Domination**: Control a majority of the world's regions
- **Economic Empire**: Accumulate target wealth
- **Cultural Hegemony**: Convert majority of regions to your influence
- **Innovation Leader**: Achieve key technological breakthroughs
- **Attention Monopoly**: Maintain #1 trending topic for set turns

### **Factions**
Each faction is asymmetric with unique abilities:
- **The Influencer Cult**: Viral marketing and social manipulation
- **The Rogue AI**: Technological disruption and automation
- **The Hyper-Capitalist Corporation**: Economic warfare and market control
- *More factions in development...*

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: TypeScript with ES modules
- **UI Library**: Neobrutalism Components
- **Map Engine**: Maplibre GL JS
- **Build Tool**: Vite with TypeScript support
- **PWA**: Service Worker for offline capabilities

### **Backend**
- **Runtime**: Cloudflare Workers with ES modules
- **Real-time**: Partykit for multiplayer
- **Database**: Cloudflare D1 for structured data
- **Storage**: Cloudflare KV for session data
- **CDN**: Cloudflare's global network

### **Development Tools**
- **Version Control**: Git with conventional commits
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier for consistent code style

## 📋 Getting Started

### **For Developers**
1. **Start Here:** [Technical Architecture Guide](docs/technical.md) - complete technical reference with implemented system architecture and project structure
2. **Get Coding:** Navigate to `game/` folder - fully implemented foundation with TypeScript, game engine, and faction system
3. **Check Progress:** [Development Roadmap](ROADMAP.md) for current priorities and completed milestones
4. **Understand Systems:** [Multiplayer Specification](docs/multiplayer.md) for real-time features (Partykit integration ready)
5. **Game Mechanics:** [Gameplay Specification](docs/gameplay.md) for core game mechanics (turn-based "News Cycle" implemented)
6. **Code Patterns:** [Code Examples](docs/examples.md) for working implementation patterns and samples

### **Quick Start Development**
```bash
cd game/
npm install
npm run dev  # Starts both client (Vite) and server (Wrangler)
```

### **For Designers**
1. Study the [Asset Specification](docs/assets.md) for design system details
2. Review the [Game Vision](docs/vision.md) for design principles
3. Understand the Neobrutalism aesthetic requirements
4. Reference the [Gameplay Specification](docs/gameplay.md) for UI requirements

### **For Stakeholders**
1. Start with the [Game Vision](docs/vision.md) for high-level understanding
2. Review the [Development Roadmap](ROADMAP.md) for timeline and milestones
3. Check success metrics and risk mitigation strategies
4. Explore the [Gameplay Specification](docs/gameplay.md) for feature scope

### **Prerequisites & Installation**
- Node.js 18+ 
- Python 3.8+ (for AI agents)
- Git

1. **Clone the repository**
   ```bash
   git clone https://github.com/thelaith/satire-empire.git
   cd satire-empire
   ```

2. **Install dependencies**
   ```bash
   # Install game dependencies (main implementation)
   cd game/
   npm install
   
   # Install UI library dependencies (optional)
   cd ../ui/
   npm install
   ```

3. **Start development**
   ```bash
   # Start game development (recommended)
   cd game/
   npm run dev  # Starts both client and server
   
   # OR start UI library development
   cd ui/
   npm run dev  # UI component development
   ```

## 🎨 Design Philosophy

The game follows five core design pillars:

1. **Satirical Depth Through Asymmetry** - Each faction parodies real-world institutions
2. **Accessible Complexity** - Simple actions with deep strategic interactions
3. **The World is a Stage** - Narrative control as the ultimate weapon
4. **Edge-First Performance** - Built for speed and responsiveness
5. **Single Developer Maintainability** - Clean, understandable codebase

## 🔗 Key Resources

- **Design System:** Neobrutalism Components library (`ui/` folder)
- **Map Engine:** Maplibre GL JS documentation
- **Backend:** Cloudflare Workers and Partykit
- **Testing:** Vitest for unit tests, Playwright for E2E
- **Performance:** Cloudflare's global edge network
- **AI Development:** Context engineering with specialized agents (`agents/` folder)

## 🏛️ Architecture

### **Game Architecture**
- **Client-Server**: Cloudflare Workers backend with TypeScript frontend
- **Real-time**: Partykit for low-latency multiplayer
- **State Management**: Durable Objects for game state persistence
- **Map System**: Maplibre GL JS for interactive global map
- **PWA**: Progressive Web App for mobile and desktop

### **Development Approach**
- **AI-Assisted Development**: Using specialized agents for different development tasks
- **Template System**: Reusable patterns for rapid development
- **Component Library**: Neobrutalism design system
- **Type Safety**: Full TypeScript coverage throughout

## 🎯 Roadmap

See our [Development Roadmap](ROADMAP.md) for detailed plans and milestones.

### **Current Phase: Foundation Complete ✅**
- ✅ Project structure and documentation
- ✅ Technical architecture planning
- ✅ Design system specification
- ✅ Game mechanics design
- ✅ **NEW**: Complete game/ folder structure implemented
- ✅ **NEW**: Core game engine with turn-based mechanics
- ✅ **NEW**: Shared TypeScript type system
- ✅ **NEW**: Faction system (Influencer Cult complete)
- ✅ **NEW**: Cloudflare Workers backend foundation
- ✅ **NEW**: Frontend application structure

### **Next Phase: Core Implementation 🔄**
- 🔄 UI component integration (Neobrutalism design)
- 🔄 Interactive map with Maplibre GL JS
- 🔄 Real-time multiplayer with Partykit
- 🔄 Remaining faction implementations (Rogue AI, Hyper-Capitalist)
- 🔄 API endpoint development
- 🔄 Testing framework implementation

## 🤝 Contributing

We welcome contributions! This project uses context engineering with AI development agents.

### **Development Workflow**
1. Read [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) for the complete development process
2. Use [.cursorrules](.cursorrules) for AI-assisted development standards
3. Reference specialized agents in `agents/` for domain expertise
4. Follow the established patterns in `examples/` and `game/`

### **Key Areas for Contribution**
- **Game Implementation:** Core mechanics, factions, and UI components
- **Technical Architecture:** Performance optimization and scalability
- **Design System:** Neobrutalism components and accessibility
- **Testing:** Comprehensive coverage and quality assurance
- **Documentation:** Keep specs updated with implementation changes

### **Development Workflow**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Standards**

- TypeScript for all new code
- Comprehensive testing with Vitest/Jest
- Accessibility compliance
- Documentation for all public APIs
- Consistent code formatting with Prettier

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by satirical strategy games
- Community-driven development approach
- Focus on performance and accessibility

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/thelaith/satire-empire/issues)
- **Discussions**: [GitHub Discussions](https://github.com/thelaith/satire-empire/discussions)
- **Documentation**: [Project Docs](docs/)

---

**Satire Empire** - Where strategy meets satire in the battle for global influence. 🎮 