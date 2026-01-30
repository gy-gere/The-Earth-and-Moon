import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

export default class Stars {
    constructor(count = 1000) {
        this.mesh = null;
        this.count = count;
        this.init();
    }

    init() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < this.count; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);
            vertices.push(x, y, z);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 }); // Simple white stars

        this.mesh = new THREE.Points(geometry, material);
    }

    getMesh() {
        return this.mesh;
    }
}
