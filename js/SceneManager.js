import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import Earth from './components/Earth.js';
import Moon from './components/Moon.js';
import Stars from './components/Stars.js';

export default class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.light = null;
        this.controls = null;

        // Components
        this.earth = null;
        this.moon = null;
        this.moonGroup = null; // Group to rotate moon around earth
        this.stars = null;

        this.init();
    }

    init() {
        this.buildScene();
        this.buildCamera();
        this.buildRenderer();
        this.buildLights();
        this.createSceneSubjects();
        this.buildControls();

        // Event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    buildScene() {
        this.scene = new THREE.Scene();
    }

    buildCamera() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
        this.camera.position.set(0, 50, 400);
    }

    buildRenderer() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
    }

    buildLights() {
        this.light = new THREE.DirectionalLight(0xffffff, 1.5);
        this.light.position.set(100, 100, 100);
        this.light.castShadow = true;
        this.scene.add(this.light);

        // Ambient light for softer shadows
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
    }

    createSceneSubjects() {
        // Stars
        this.stars = new Stars(2000);
        this.scene.add(this.stars.getMesh());

        // Earth
        this.earth = new Earth(this.scene);

        // Moon
        this.moon = new Moon();

        // Grouping for orbit
        this.moonGroup = new THREE.Group();
        this.moonGroup.add(this.earth.getMesh()); // Add Earth to center of group? No, Earth rotates on its own.
        // Actually, let's keep Earth in scene, and have a moonPivot for the moon.

        // Rethinking hierarchy for clearer orbits:
        // Scene -> Earth
        // Scene -> MoonPivot -> Moon

        this.scene.add(this.earth.getMesh());

        this.moonPivot = new THREE.Object3D();
        this.moonPivot.add(this.moon.getMesh()); // Moon is offset by its distance in its own class
        this.scene.add(this.moonPivot);
    }

    buildControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        // Update subjects
        if (this.earth) this.earth.update();
        if (this.moon) this.moon.update();
        if (this.moonPivot) this.moonPivot.rotation.y += 0.002; // Orbit

        if (this.controls) this.controls.update();

        this.renderer.render(this.scene, this.camera);
    }
}
