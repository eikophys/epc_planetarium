import * as THREE from 'three';
const earthGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
    40,
    30,
    30
);
const earthMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial(
    {
        map: new THREE.TextureLoader().load('img/earthmap1k.jpg'),
    }
);
export default new THREE.Mesh(earthGeometry, earthMaterial);
