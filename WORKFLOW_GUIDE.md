# Satire Empire - Development Workflow Guide

## 🎯 How to Keep AI Development On Track

This guide ensures you get consistent, high-quality development following the **Context Engineering** approach built into this project.

## 🧠 Context Engineering Workflow

### **1. Always Start with Context**

Before any development task, ensure the AI reads the relevant documentation:

```
@.cursorrules @docs/vision.md @docs/technical.md @docs/gameplay.md @roadmap.md
```

**Key Files to Reference:**
- `.cursorrules` - Development rules and patterns
- `docs/vision.md` - Game vision and design pillars  
- `docs/technical.md` - Architecture and implementation details
- `docs/gameplay.md` - Game mechanics and balance
- `ROADMAP.md` - Current phase and priorities
- `examples/` - Working code patterns

### **2. Leverage Specialized Agents**

Use agents from `agents/categories/` for domain expertise:

- **`@backend-developer.md`** - Server logic and APIs
- **`@frontend-developer.md`** - UI components and client code
- **`@game-developer.md`** - Game mechanics and optimization
- **`@typescript-pro.md`** - Type safety and architecture
- **`@qa-expert.md`** - Testing strategies
- **`@performance-engineer.md`** - Optimization

**Usage Pattern:**
```
I need to implement the Rogue AI faction. 
@game-developer.md @backend-developer.md @typescript-pro.md
Context: @docs/gameplay.md @examples/game-engine-example.ts
```

### **3. Follow PRP Methodology**

Use the **Product Requirements Prompts** from `template/PRPs/`:

1. **Problem Definition** - What exactly needs to be built?
2. **Requirements** - Technical and functional specifications  
3. **Patterns** - Code examples and architectural guidance

## 🔄 Full Development Cycle

### **Phase 1: Planning & Context**

```bash
# 1. Start with documentation context
"I want to implement [feature]. Let me provide context:"
@.cursorrules @docs/technical.md @relevant-agent.md

# 2. Define requirements clearly
"Requirements:
- Feature: [specific functionality]
- Technical: [implementation details]
- Dependencies: [what relies on this]
- Tests: [what needs testing]"
```

### **Phase 2: Implementation**

```bash
# 3. Implement with todo tracking
"Create todos for this multi-step feature"
# AI will use todo_write tool to track progress

# 4. Write code following patterns
# AI follows .cursorrules:
# - TypeScript strict mode
# - ES modules
# - Modular architecture (<500 lines per file)
# - Test-first development

# 5. Validate as you go
"Check for linting errors and fix them"
# AI will use read_lints tool
```

### **Phase 3: Testing & Quality**

```bash
# 6. Comprehensive testing
"Create unit tests for this feature using Vitest"
"Add E2E tests for the user flow with Playwright"
"Test accessibility compliance"

# 7. Performance validation
"Check Core Web Vitals and bundle size impact"
```

### **Phase 4: Git Workflow**

```bash
# 8. Clean commits following conventions
git add .
git commit -m "feat(faction): implement Rogue AI with automation abilities

- Add RogueAI class extending BaseFaction
- Implement unique abilities: cyber-hack, automate, neural-network  
- Add automation mechanics for resource generation
- Create comprehensive test suite
- Update faction selection UI
- Performance: maintained <100ms action processing

Closes #123"

# 9. Push and update documentation
git push origin feature/rogue-ai-faction
```

## ⚡ Key Workflow Principles

### **Context Engineering Commands**

Always use these patterns to maintain context:

```bash
# Feature Development
"@.cursorrules @technical.md @gameplay.md 
Implement [feature] following the established patterns."

# Bug Fixing  
"@.cursorrules @examples/[relevant-example].ts
Fix this bug while maintaining type safety and performance."

# Code Review
"@.cursorrules @typescript-pro.md 
Review this code for architecture and TypeScript best practices."

# Testing
"@.cursorrules @qa-expert.md
Create comprehensive tests for this game mechanic."
```

### **Git Commit Standards**

Follow **Conventional Commits** with game-specific prefixes:

```bash
feat(engine): add turn-based phase management
fix(faction): resolve Influencer Cult viral spreading bug
docs(api): update multiplayer WebSocket documentation  
test(ui): add E2E tests for territory selection
perf(map): optimize Maplibre GL rendering performance
refactor(types): consolidate shared interfaces
chore(deps): update Cloudflare Workers runtime
```

### **Test Validation Checklist**

For every feature:

- [ ] **Unit Tests** - Logic and edge cases (Vitest)
- [ ] **Integration Tests** - API endpoints and data flow  
- [ ] **E2E Tests** - Critical user journeys (Playwright)
- [ ] **Type Safety** - No TypeScript errors or warnings
- [ ] **Performance** - Bundle size and Core Web Vitals
- [ ] **Accessibility** - WCAG 2.1 AA compliance
- [ ] **Game Balance** - Faction balance and victory conditions

## 🎮 Game-Specific Workflow

### **Adding New Features**

```bash
# 1. Context and Planning
"@.cursorrules @gameplay.md @technical.md
I want to add [game feature]. What's the implementation approach?"

# 2. Check Game Balance
"@game-developer.md How does this affect faction balance?"

# 3. Implementation
"Implement this following the game engine patterns in examples/"

# 4. Testing
"Create tests including multiplayer scenarios and edge cases"

# 5. Integration
"Integrate with existing systems and update shared types"
```

### **Faction Development Pattern**

```bash
# Complete faction implementation workflow:

1. "@game-developer.md @backend-developer.md Design [Faction] abilities"
2. "Extend BaseFaction with unique mechanics" 
3. "Add faction to gameConfig.ts constants"
4. "Create comprehensive Vitest test suite"
5. "Update faction selection UI"
6. "Test multiplayer balance scenarios"
7. "Document satirical theme and abilities"
8. "Git commit with conventional format"
```

### **UI Component Workflow**

```bash
1. "@frontend-developer.md @ui/src/components/ Create [Component]"
2. "Follow Neobrutalism design system"
3. "Ensure mobile responsiveness and touch optimization"  
4. "Add accessibility features and keyboard navigation"
5. "Create Storybook documentation"
6. "Write interaction tests with Playwright"
7. "Validate Core Web Vitals impact"
```

## 📋 Workflow Enforcement

### **AI Development Checklist**

Use this checklist for every development session:

- [ ] **Read Context First** - Always start with relevant @docs
- [ ] **Use Specialized Agents** - Reference appropriate agents
- [ ] **Create Todos** - Track multi-step features  
- [ ] **Follow .cursorrules** - Maintain code standards
- [ ] **Write Tests** - Comprehensive coverage
- [ ] **Check Performance** - Bundle size and speed
- [ ] **Git Commit Clean** - Conventional commit format
- [ ] **Update Documentation** - Keep docs current

### **Session Startup Commands**

Start every development session with:

```bash
# Context Loading
"@.cursorrules @roadmap.md What's the current development priority?"

# Agent Selection  
"@[relevant-agent].md I need to work on [area]"

# Planning
"Create todos for this feature and mark the first one in progress"

# Implementation
"Following established patterns, implement [feature]"
```

### **Session Completion Commands**

End every session with:

```bash
# Quality Check
"Run linting and fix any errors"
"Validate test coverage is >85%"

# Git Workflow
"git add . && git commit with conventional format"
"git push origin [branch]"

# Documentation Update
"Update roadmap with completed features"
```

## 🎯 Maintaining Long-term Quality

### **Weekly Review Process**

```bash
# Architecture Review
"@typescript-pro.md Review codebase architecture for technical debt"

# Game Balance Review  
"@game-developer.md Analyze faction balance based on playtesting data"

# Performance Review
"@performance-engineer.md Check Core Web Vitals and optimization opportunities"

# Documentation Sync
"Update all README files and documentation with current state"
```

### **Pre-Release Checklist**

Before major releases:

- [ ] **Full Test Suite** - All tests passing
- [ ] **Performance Audit** - Lighthouse score >90
- [ ] **Accessibility Audit** - WCAG 2.1 AA compliance  
- [ ] **Security Review** - Vulnerability scanning
- [ ] **Game Balance** - Multi-player testing completed
- [ ] **Documentation** - All docs updated and accurate
- [ ] **Deployment** - Staging environment validated

## 🚀 Quick Reference

### **Essential Commands**

```bash
# Start Development
"@.cursorrules @technical.md @roadmap.md Begin [feature] development"

# Get Help
"@[agent].md Help with [specific domain problem]"

# Quality Check  
"Run linting, tests, and performance checks"

# Complete Feature
"Create conventional commit and update documentation"
```

### **Folder Structure Reminders**

- `game/` - Main implementation (client/server/shared)
- `docs/` - All specifications and documentation
- `examples/` - Working code patterns and references
- `agents/` - Domain-specific AI development agents  
- `template/` - Context engineering templates and PRPs
- `ui/` - Neobrutalism component library

---

**Remember:** The AI is most effective when given proper context, clear requirements, and specific agent expertise. Use this workflow to maintain consistent, high-quality development! 🎮✨