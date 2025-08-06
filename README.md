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
│   ├── roadmap.md            # Development phases and milestones
│   ├── technical.md          # Technical architecture and stack
│   ├── vision.md             # Game vision and high-level concept
│   └── README.md             # Documentation overview
├── examples/                 # Example implementations and use cases
├── template/                 # Template system for project generation
│   ├── use-cases/
│   │   ├── mcp-server/      # Model Context Protocol server examples
│   │   ├── pydantic-ai/     # Pydantic AI agent examples
│   │   └── template-generator/
└── ui/                      # User interface components and styling
    ├── src/
    │   ├── components/      # UI components
    │   ├── app/            # Next.js app structure
    │   └── ...
```

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

### **Prerequisites**
- Node.js 18+ 
- Python 3.8+ (for AI agents)
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/thelaith/satire-empire.git
   cd satire-empire
   ```

2. **Install dependencies**
   ```bash
   # Install UI dependencies
   cd ui
   npm install
   ```

3. **Start development**
   ```bash
   # Start UI development server
   cd ui
   npm run dev
   ```

## 🎨 Design Philosophy

The game follows five core design pillars:

1. **Satirical Depth Through Asymmetry** - Each faction parodies real-world institutions
2. **Accessible Complexity** - Simple actions with deep strategic interactions
3. **The World is a Stage** - Narrative control as the ultimate weapon
4. **Edge-First Performance** - Built for speed and responsiveness
5. **Single Developer Maintainability** - Clean, understandable codebase

## 📚 Documentation

- [Vision](docs/vision.md) - Game vision and high-level concept
- [Gameplay](docs/gameplay.md) - Core game mechanics and systems
- [Technical](docs/technical.md) - Technical architecture and stack
- [Multiplayer](docs/multiplayer.md) - Multiplayer architecture and networking
- [Assets](docs/assets.md) - Design system and visual requirements
- [Roadmap](docs/roadmap.md) - Development phases and milestones

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

See our [Development Roadmap](docs/roadmap.md) for detailed plans and milestones.

### **Current Phase**
- ✅ Project structure and documentation
- ✅ Technical architecture planning
- ✅ Design system specification
- ✅ Game mechanics design

### **Upcoming Features**
- 🔄 Core multiplayer functionality
- 🔄 Faction system implementation
- 🔄 Map integration and styling
- 🔄 AI bot framework

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

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