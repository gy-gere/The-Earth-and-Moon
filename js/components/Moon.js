import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

export default class Moon {
    constructor() {
        this.mesh = null;
        this.distanceFromEarth = 200;
        this.init();
    }

    init() {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png');

        const material = new THREE.MeshPhongMaterial({ map: texture });
        const geometry = new THREE.SphereGeometry(30, 64, 64);

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // Set initial position
        this.mesh.position.set(this.distanceFromEarth, 0, 0);
    }

    update() {
        if (this.mesh) {
            this.mesh.rotation.y += 0.005;
        }
    }

    getMesh() {
        return this.mesh;
    }
}
