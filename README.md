# Professional Earth and Moon 3D Visualization

A professional, modular 3D visualization of the Earth and Moon using [Three.js](https://threejs.org/).

## Features
- **Modular Architecture**: Code split into reusable ES6 components (`Earth`, `Moon`, `Stars`, `SceneManager`).
- **Interactive Controls**: Orbit around the scene using `OrbitControls`.
- **Dynamic Lighting**: Directional sunlight with shadows.
- **Starfield**: Procedural background stars.
- **Responsive Design**: Automatically adapts to window resizing.

## Project Structure
```
/
├── css/
│   └── style.css       # Styles
├── js/
│   ├── components/     # 3D Objects (Earth, Moon, Stars)
│   ├── main.js         # Entry point
│   └── SceneManager.js # Scene coordination
├── index.html          # Main HTML
└── README.md           # Documentation
```

## How to Run
Due to browser security restrictions (CORS) with ES modules, you cannot simply open `index.html` directly from the file explorer. You must serve it via a local web server.

### Option 1: VS Code Live Server
1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` and select "Open with Live Server".

### Option 2: Node.js / npx
1. Open a terminal in this folder.
2. Run:
   ```bash
   npx serve .
   ```
3. Open the provided localhost URL.

### Option 3: Python
1. Open a terminal.
2. Run:
   ```bash
   python -m http.server
   ```
3. Go to `http://localhost:8000`