# Portfolio Site - Setup Instructions

## Issue Identified

The modular architecture uses JavaScript `fetch()` to load HTML sections dynamically. This **requires a web server** and will not work when opening `index.html` directly via `file://` protocol due to browser CORS security policies.

## Quick Start - Run Local Server

Choose one of these methods to run the portfolio:

### Method 1: Python (Recommended)
```bash
# Navigate to portfolio directory
cd c:\Users\conne\Downloads\Portfolio\Abhay-Portfolio

# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Method 2: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Method 3: Node.js http-server
```bash
# Install globally (one time)
npm install -g http-server

# Run in portfolio directory
http-server -p 8000

# Then open: http://localhost:8000
```

## Optimization Recommendations

### 1. Loading State (High Priority)
Add a loading indicator while sections are being fetched.

### 2. Error Handling (High Priority)
Detect `file://` protocol and show helpful message.

### 3. Performance (Medium Priority)
- Minify section HTML files
- Add service worker for caching
- Lazy load below-fold sections

### 4. Fallback Option (Low Priority)
Create a `index-standalone.html` with all content inlined for offline use.

## Current Status

- Header and footer: Working
- Navigation buttons: Non-functional (targets not loaded)
- All sections: Not visible (CORS blocked)
- Project pages: Working correctly (no dynamic loading)

## Next Steps

1. Run local server using one of the methods above
2. Test all functionality
3. Consider implementing optimizations
