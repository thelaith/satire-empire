# **Assets**

## **1. Design System: Neobrutalism**

* All UI will adhere to the principles of Neobrutalism.
* We will use the **neobrutalism-components** library as a base.
* Any custom components or extensions will be documented in this spec.
* The design system will be consistently applied across all UI elements, including charts, modals, and forms.

### **Neobrutalism Principles**
- **Bold Typography:** Heavy, impactful fonts with strong contrast
- **High Contrast Colors:** Vibrant, saturated color palette
- **Geometric Shapes:** Sharp edges, bold rectangles, and strong angles
- **Raw Aesthetics:** Unapologetic, direct visual communication
- **Playful Elements:** Humorous touches that match the satirical theme

### **Color Palette**
- **Primary:** High contrast combinations (black/white, neon colors)
- **Accent:** Bright, saturated colors for emphasis
- **Background:** Clean, minimal backgrounds
- **Text:** High contrast for maximum readability

### **Color System**
- **Faction Colors:** Unique color schemes for each faction
- **State Colors:** Clear indicators for different game states
- **Resource Colors:** Distinct colors for different resource types
- **Accessibility:** Color-blind friendly alternatives for all color-coded elements

### **Typography**
- **Headers:** Bold, heavy fonts for maximum impact
- **Body Text:** Clean, readable fonts for game information
- **UI Elements:** Consistent font weights and sizes
- **Special Effects:** Drop shadows and outlines for depth

## **2. Map Styling**

* The game map will be styled using Maplibre's styling capabilities.
* The style will be a custom creation, designed to fit the Neobrutalist aesthetic.
* The map will be clean, readable, and performant.

### **Map Design Requirements**
- **Neobrutalist Style:** Bold, geometric map elements
- **High Contrast:** Clear visibility of territories and boundaries
- **Interactive Elements:** Hover states and click feedback
- **Performance:** Optimized for smooth panning and zooming
- **Accessibility:** Color-blind friendly design

### **Map Features**
- **Territory Visualization:** Clear boundaries between player-controlled areas
- **Resource Indicators:** Visual representation of resource generation
- **Event Markers:** Icons for narrative events and special locations
- **Player Information:** Overlays showing player stats and actions

## **3. Asset Pipeline**

* All assets (images, fonts, etc.) will be optimized for the web.
* We will use modern image formats (e.g., WebP) where possible.
* Assets will be served from a CDN for fast delivery.

### **Image Assets**
- **Faction Icons:** Unique, recognizable icons for each faction
- **Event Illustrations:** Bold, satirical illustrations for game events
- **UI Elements:** Buttons, cards, and interface components
- **Map Markers:** Territory indicators and resource symbols

### **Font Assets**
- **Primary Font:** Bold, impactful font for headers and titles
- **Secondary Font:** Clean, readable font for body text
- **Icon Font:** Custom icon font for UI elements
- **Loading Strategy:** Font display swap for performance

### **Animation Assets**
- **Micro-interactions:** Subtle animations for user feedback
- **State Transitions:** Smooth transitions between game states
- **Loading States:** Engaging loading animations
- **Victory/Defeat:** Celebratory animations for game outcomes

## **4. Component Library**

### **Core Components**
- **Button:** Primary, secondary, and tertiary button styles
- **Card:** Information containers with Neobrutalist styling
- **Modal:** Overlay dialogs for game actions
- **Tooltip:** Contextual information display
- **Progress Bar:** Turn timers and resource indicators

### **Game-Specific Components**
- **Faction Card:** Player information and abilities display
- **Territory Map:** Interactive map with player controls
- **Event Panel:** Narrative events and their effects
- **Chat Interface:** Player communication system
- **Settings Panel:** Game configuration options

### **Responsive Design**
- **Mobile-First:** All components designed for mobile screens
- **Touch Targets:** Adequate size for touch interaction
- **Flexible Layout:** Components adapt to different screen sizes
- **Performance:** Optimized rendering for mobile devices

### **Breakpoint Strategy**
- **Mobile:** 320px - 768px (primary focus)
- **Tablet:** 768px - 1024px (enhanced layout)
- **Desktop:** 1024px+ (full feature set)
- **Large Desktop:** 1440px+ (additional information density)

### **Touch Optimization**
- **Minimum Touch Target:** 44px for all interactive elements
- **Gesture Support:** Swipe, pinch, and tap gestures
- **Haptic Feedback:** Vibration feedback for important actions
- **One-Handed Use:** Critical actions accessible with thumb

## **5. Accessibility**

### **Visual Accessibility**
- **Color Contrast:** WCAG AA compliance for all text
- **Color Blind Support:** Alternative indicators beyond color
- **Text Scaling:** Support for browser text scaling
- **Focus Indicators:** Clear focus states for keyboard navigation

### **Interaction Accessibility**
- **Keyboard Navigation:** Full keyboard support for all features
- **Screen Reader Support:** Proper ARIA labels and descriptions
- **Alternative Text:** Descriptive alt text for all images
- **Error Handling:** Clear error messages and recovery options

## **6. Performance Optimization**

### **Asset Loading**
- **Lazy Loading:** Load assets only when needed
- **Preloading:** Critical assets loaded early
- **Compression:** Optimized file sizes without quality loss
- **Caching:** Aggressive caching for static assets

### **Rendering Performance**
- **GPU Acceleration:** Hardware acceleration for animations
- **Efficient Animations:** CSS transforms over layout changes
- **Memory Management:** Proper cleanup of unused assets
- **Bundle Optimization:** Minimal asset bundle sizes 