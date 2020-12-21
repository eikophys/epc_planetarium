import { PerspectiveCamera } from 'three';

export default function addCamera(
    width: number,
    height: number
): [PerspectiveCamera, PerspectiveCamera] {
    // カメラ(1人称・3人称)
    const camera1: PerspectiveCamera = new PerspectiveCamera(
        60,
        width / height
    );
    const camera3: PerspectiveCamera = new PerspectiveCamera(
        45,
        width / height
    );
    camera3.position.set(500, 500, 500);
    camera3.lookAt(0, 0, 0);
    camera1.aspect = 60;
    camera1.position.set(0, 100, 0);
    return [camera1, camera3];
}
