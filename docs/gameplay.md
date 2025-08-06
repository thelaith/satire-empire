# **Gameplay**

## **1. Core Gameplay Loop: "The News Cycle"**

Each turn represents a single day in the global news cycle, where players compete to make headlines and shape the global narrative.

### **1.1. Turn Structure**

1. **📰 Morning Brief (45s):**
   * World events and consequences from the previous turn are revealed.
   * All players generate resources based on controlled territories.
   * Trending topics from the previous turn are announced, providing bonuses.

2. **⚡ Action Phase (90-120s):**
   * Players simultaneously queue multiple primary actions.
   * Core Actions: **Invest**, **Influence**, **Invade**.
   * Some actions are telegraphed, allowing for counter-play.

3. **🔥 Breaking News Resolution (45s):**
   * All queued actions resolve simultaneously with dramatic presentation.
   * Satirical headlines are generated that affect future turns.
   * Players gain/lose attention based on the impact of their actions.

## **2. Victory Conditions**

* **Territorial Domination:** Control a majority of the world's regions.
* **Economic Empire:** Accumulate a target amount of wealth.
* **Cultural Hegemony:** Convert a majority of regions to your influence.
* **Innovation Leader:** Achieve key technological breakthroughs.
* **Attention Monopoly:** Maintain the #1 trending topic for a set number of turns.

## **3. Factions**

* Factions are asymmetric, with unique abilities and victory paths.
* Examples: "The Influencer Cult," "The Rogue AI," "The Hyper-Capitalist Corporation."
* Faction design will be modular to allow for easy expansion and UGC.

## **4. Map & Territory System**

* The map will be rendered using **Maplibre GL JS**.
* It will be a global, interactive map.
* Territories will be represented by stylized regions.
* There will be a minimap for simpler navigation
* The map will be optimized for both desktop (mouse) and mobile (touch) interaction.

### **4.1. Territory Types**
- **Core Territories:** Major regions with high resource generation
- **Border Territories:** Smaller regions that provide strategic positioning
- **Special Territories:** Unique regions with special bonuses or events
- **Neutral Territories:** Unclaimed areas that can be contested

### **4.2. Map Interactions**
- **Click to Select:** Direct territory selection
- **Drag to Pan:** Smooth map navigation
- **Zoom Controls:** Mouse wheel and pinch gestures
- **Territory Highlighting:** Hover states and selection indicators
- **Resource Overlays:** Visual representation of resource generation

## **5. Core Actions**

### **5.1. Invest**
- **Purpose:** Generate resources and build economic power
- **Mechanics:** Allocate resources to territories for income generation
- **Strategic Depth:** Risk vs. reward, compound interest mechanics
- **Faction Variations:** Different investment strategies and bonuses

### **5.2. Influence**
- **Purpose:** Convert territories and spread cultural dominance
- **Mechanics:** Propaganda campaigns, media manipulation, cultural exports
- **Strategic Depth:** Soft power vs. hard power, cultural resistance
- **Faction Variations:** Unique influence methods and cultural themes

### **5.3. Invade**
- **Purpose:** Direct territorial control through military force
- **Mechanics:** Combat resolution, occupation costs, resistance
- **Strategic Depth:** Timing, logistics, diplomatic consequences
- **Faction Variations:** Specialized military units and tactics

## **6. Resource System**

### **6.1. Primary Resources**
- **Wealth:** Economic power for investments and actions
- **Attention:** Social capital for influence and trending topics
- **Territory:** Geographic control for resource generation
- **Technology:** Innovation points for advanced capabilities

### **6.2. Resource Generation**
- **Territorial Income:** Base resources from controlled regions
- **Investment Returns:** Compound growth from economic investments
- **Cultural Exports:** Income from influence in other territories
- **Innovation Bonuses:** Technology-driven resource multipliers

## **7. Event System**

### **7.1. Narrative Events**
- **Random Events:** Global events that affect all players
- **Faction Events:** Special events triggered by faction abilities
- **Player Events:** Events caused by player actions and strategies

### **7.2. Event Types**
- **Economic Events:** Market crashes, booms, trade wars
- **Cultural Events:** Viral trends, cultural movements, scandals
- **Technological Events:** Breakthroughs, cyber attacks, AI developments
- **Political Events:** Elections, conflicts, diplomatic incidents

## **8. Attention & Trending System**

### **8.1. Attention Mechanics**
- **Attention Generation:** Actions that generate global attention
- **Attention Spending:** Using attention for powerful abilities
- **Attention Decay:** Natural decline of attention over time

### **8.2. Trending Topics**
- **Topic Generation:** Events and actions create trending topics
- **Topic Bonuses:** Special abilities unlocked by trending topics
- **Topic Competition:** Multiple players can compete for topic control
- **Topic Evolution:** Topics change and evolve over multiple turns

## **9. Combat & Conflict**

### **9.1. Invasion Mechanics**
- **Force Composition:** Different unit types with unique abilities
- **Terrain Effects:** Geographic features affect combat outcomes
- **Defensive Bonuses:** Occupied territories provide defensive advantages
- **Logistics:** Supply lines and resource costs for military actions

### **9.2. Non-Military Conflict**
- **Economic Warfare:** Trade sanctions, market manipulation
- **Information Warfare:** Hacking, misinformation, cyber attacks
- **Cultural Conflict:** Competing cultural influences and propaganda
- **Diplomatic Pressure:** Alliances, treaties, and political pressure

## **10. Advanced Mechanics**

### **10.1. Alliances & Diplomacy**
- **Temporary Alliances:** Short-term partnerships for mutual benefit
- **Trade Agreements:** Resource sharing and economic cooperation
- **Joint Operations:** Coordinated actions between multiple players
- **Betrayal Mechanics:** Alliance breaking and consequences

### **10.2. Technology Tree**
- **Research Points:** Earned through innovation and territory control
- **Technology Branches:** Different paths for technological advancement
- **Technology Sharing:** Alliances can share technological benefits
- **Technology Theft:** Espionage and technology acquisition

### **10.3. Espionage & Information**
- **Intelligence Gathering:** Information about other players' actions
- **Counter-Intelligence:** Protecting your own information
- **Disinformation:** Planting false information to mislead opponents
- **Cyber Warfare:** Digital attacks on opponents' systems

## **11. Balance & Progression**

### **11.1. Catch-Up Mechanics**
- **Dynamic Scoring:** Multiple victory paths prevent snowballing
- **Event Bonuses:** Random events can help trailing players
- **Alliance Opportunities:** Weaker players can form powerful alliances
- **Innovation Rewards:** Creative strategies are rewarded

### **11.2. Skill Expression**
- **Timing:** When to act and when to wait
- **Positioning:** Strategic placement of resources and influence
- **Adaptation:** Responding to changing game conditions
- **Prediction:** Anticipating opponent moves and events

## **12. Accessibility & Learning**

### **12.1. Tutorial System**
- **Interactive Tutorial:** Step-by-step learning of core mechanics
- **Faction-Specific Guides:** Detailed explanations of each faction
- **Practice Mode:** Single-player practice with AI opponents
- **Tooltips:** Contextual help throughout the game

### **12.2. Visual Feedback**
- **Clear Indicators:** Visual cues for all game states
- **Animation System:** Engaging animations for all actions
- **Color Coding:** Consistent color system for different elements
- **Accessibility Options:** Support for color-blind players

## **13. Game Balance & Meta**

### **13.1. Faction Balance**
- **Rock-Paper-Scissors:** Each faction has natural counters
- **Power Scaling:** Factions scale differently over time
- **Situational Strength:** Different factions excel in different scenarios
- **Counter-Play:** Every strategy has viable counter-strategies

### **13.2. Resource Economy**
- **Scarcity Management:** Limited resources force meaningful choices
- **Investment Timing:** When to save vs. when to spend
- **Risk vs. Reward:** High-risk actions offer higher potential rewards
- **Economic Cycles:** Boom and bust cycles affect all players

### **13.3. Meta Evolution**
- **Strategy Discovery:** New strategies emerge through play
- **Counter-Meta:** Successful strategies create counter-strategies
- **Faction Popularity:** Meta shifts affect faction selection
- **Balance Patches:** Regular updates to maintain diversity 