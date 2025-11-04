# Project Structure & Organization

## Root Directory Structure
```
JeuxPlateau/
├── index.html              # Main application entry point (558 lines)
├── styles.css              # Global styles with CSS variables (798 lines)
├── manifest.json           # PWA configuration
├── version.json            # Current version and metadata
├── sw.js                   # Service Worker for offline support
├── README.md               # Comprehensive project documentation
├── package.json            # npm dependencies and scripts
├── vitest.config.js        # Test configuration
├── .gitignore              # Git ignore patterns
├── .gitlab-ci.yml          # CI/CD pipeline configuration
└── architecture.drawio     # System architecture diagram
```

## Assets & Media
```
├── logo.svg                # SVG application logo (scalable)
├── logo.png                # PNG fallback logo
├── icon-192.png            # PWA icon 192x192
├── icon-512.png            # PWA icon 512x512
```

## JavaScript Architecture
```
js/
├── app.js                  # Main GameApp class controller (658 lines)
├── base-game.js            # Abstract BaseGame parent class (48 lines)
├── game-framework.js       # Shared utilities and framework code
├── tictactoe-game.js       # Tic-Tac-Toe implementation (86 lines)
├── checkers-game.js        # Checkers/Dames implementation (176 lines)
├── chess-game.js           # Chess implementation (224 lines)
├── backgammon-game.js      # Backgammon/Tavli implementation (280 lines)
├── ludo-game.js            # Ludo/Petits Chevaux implementation (197 lines)
└── abalone-game.js         # Abalone implementation (320 lines)
```

## Testing Structure
```
tests/
├── tictactoe.test.js       # Tic-Tac-Toe unit tests
├── checkers.test.js        # Checkers game logic tests
└── game-framework.test.js  # Framework utility tests
```

## Documentation & History
```
Pull_requests/
├── prompt_history.md       # Development prompt history
├── pr_description.md       # General PR template
├── pr_v1.0.1.md           # Version-specific PR documentation
├── pr_v1.0.2.md           # (Pattern continues for each version)
├── ...
└── pr_v1.4.17.md          # Latest version PR
```

## File Size Guidelines
- **JavaScript files**: Keep under 400 lines per file
- **Game implementations**: Target 200-300 lines maximum
- **CSS**: Organized in logical sections with comments
- **HTML**: Single-page application structure

## Naming Conventions
- **Files**: kebab-case for all files (`tictactoe-game.js`)
- **Classes**: PascalCase (`TicTacToeGame`, `GameApp`)
- **Methods**: camelCase with descriptive French names where appropriate
- **CSS Classes**: kebab-case with semantic naming
- **IDs**: kebab-case for DOM elements

## Code Organization Patterns
1. **File Headers**: Every file starts with author, role, description, version history
2. **Class Structure**: Constructor → UI methods → Game logic → Utilities
3. **Method Grouping**: Use comment separators to organize functionality
4. **Inheritance**: All games extend `BaseGame` for common functionality
5. **Event Handling**: Centralized in main `GameApp` class with delegation

## Asset Management
- **Icons**: Multiple formats (SVG preferred, PNG fallbacks)
- **Images**: Optimized for web delivery
- **Fonts**: System fonts for performance
- **Colors**: CSS custom properties for theming

## Configuration Files
- **PWA**: `manifest.json` with proper metadata and icons
- **Testing**: `vitest.config.js` with jsdom environment
- **CI/CD**: `.gitlab-ci.yml` for automated testing
- **Version**: `version.json` for application versioning