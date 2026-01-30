import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

export default class Earth {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.init();
    }

    init() {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';
        // Use a high-quality texture if available, sticking to the provided one for now
        const texture = loader.load('https://upload.wikimedia.org/wikipedia/commons/c/cf/WorldMap-A_non-Frame.png');

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 5
        });
        const geometry = new THREE.SphereGeometry(100, 64, 64);

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // Add to scene immediately or return mesh? 
        // A component usually manages its own mesh, but adding to a parent group is flexible.
        // For this simple case, we'll expose the mesh.
    }

    update() {
        if (this.mesh) {
            this.mesh.rotation.y += 0.0005;
        }
    }

    getMesh() {
        return this.mesh;
    }
}
