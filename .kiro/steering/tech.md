# Technology Stack & Build System

## Core Technologies
- **HTML5**: Semantic structure with PWA manifest
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript (ES6+)**: No external frameworks, pure JavaScript with classes
- **PWA**: Progressive Web App with Service Worker for offline support

## Architecture Pattern
- **Object-Oriented Design**: Class-based inheritance with `BaseGame` parent class
- **Modular Structure**: Each game is a separate file extending `BaseGame`
- **Event-Driven**: DOM event handling with delegation patterns
- **Local Storage**: Browser storage for settings, history, and customization

## File Organization
```
js/
├── base-game.js        # Abstract base class for all games
├── app.js             # Main application controller (GameApp class)
├── *-game.js          # Individual game implementations
└── game-framework.js   # Shared game utilities (if present)
```

## Code Style Guidelines
- **French Comments**: All documentation and comments in French
- **File Headers**: Each file includes author, role, description, and version history
- **Class Structure**: Constructor → UI methods → Game logic → Utilities
- **Method Organization**: Group by functionality with comment separators
- **Naming**: Descriptive French method names, English for technical terms

## Testing
- **Framework**: Vitest with jsdom environment
- **Coverage**: V8 provider with HTML reports
- **Structure**: Tests in `/tests/` directory matching source files
- **Pattern**: Unit tests for game logic, integration tests for UI interactions

## Common Commands
```bash
# Install dependencies
npm install

# Run tests (watch mode)
npm test

# Run tests (single run)
npm run test:run

# Run tests with UI
npm run test:ui
```

## PWA Configuration
- **Manifest**: `manifest.json` with proper icons and theme colors
- **Service Worker**: `sw.js` for caching and offline functionality
- **Icons**: SVG logo + PNG icons (192x192, 512x512)
- **Theme**: Blue primary color (#2196F3)

## CSS Architecture
- **CSS Variables**: Custom properties for theming (--light-cell, --dark-cell, etc.)
- **Responsive Design**: Mobile-first with breakpoints at 768px
- **Glassmorphism**: Backdrop blur effects for modern UI
- **Grid Layouts**: CSS Grid for game boards, Flexbox for UI components

## Version Management
- **Version File**: `version.json` with semantic versioning
- **Pull Request Documentation**: Detailed PR files in `/Pull_requests/`
- **Automated Versioning**: Each feature increment updates version.json