import SceneManager from './SceneManager.js';

// Get the canvas element
const canvas = document.getElementById('canvas');

// Initialize the Scene Manager
const sceneManager = new SceneManager(canvas);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    sceneManager.update();
}

animate();
