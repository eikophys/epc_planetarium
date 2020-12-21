import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera, WebGLRenderer } from 'three';

export default function setControl(
    camera1: PerspectiveCamera,
    camera3: PerspectiveCamera,
    renderer: WebGLRenderer
): OrbitControls {
    const control3: OrbitControls = new OrbitControls(
        camera3,
        renderer.domElement
    );
    const control1: OrbitControls = new OrbitControls(
        camera1,
        renderer.domElement
    );
    control3.enablePan = false;
    control3.minDistance = 200;
    control3.maxDistance = 1000;
    control3.enableDamping = true;
    control3.dampingFactor = 0.1;

    control1.target.set(
        camera1.position.x + 0.01,
        camera1.position.y,
        camera1.position.z
    );
    control1.enableDamping = true;
    control1.dampingFactor = 0.1;
    return control3;
}
