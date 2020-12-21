import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './list.ts';
import drawStar from './drawStar';
import fps from './fps';
import scene from './scene';
import earth from './earth';
import { setView, viewStatus } from './view';
import '../scss/styles.scss';

window.addEventListener('load', init);

function init(): void {
    let width: number = window.innerWidth;
    let height: number = window.innerHeight;
    const r = 200; // 半径
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
        document.querySelector('#main')
    );

    // カメラ(1人称・3人称)
    const camera1: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        60,
        width / height
    );
    const camera3: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        45,
        width / height
    );
    camera3.position.set(500, 500, 500);
    camera3.lookAt(0, 0, 0);
    scene.add(camera3);
    camera1.aspect = 60;
    camera1.position.set(0, 100, 0);
    scene.add(camera1);

    // レンダラー
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);

    const [starsGroup, sprites]: [THREE.Group, THREE.Sprite[]] = drawStar(r);
    scene.add(starsGroup);

    const mouse = new THREE.Vector2();
    // レイキャスト
    const raycast: THREE.Raycaster = new THREE.Raycaster();
    canvas.addEventListener('mousemove', (event) => {
        const element: any = event.currentTarget;
        const x: number = event.clientX;
        const y: number = event.clientY;
        const w: number = element?.offsetWidth;
        const h: number = element?.offsetHeight;
        mouse.x = (x / w) * 2 - 1;
        mouse.y = -(y / h) * 2 + 1;
    });

    // ドーム
    const SPGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
        1.1 * r,
        12,
        5
    );
    const SPMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
    const dome: THREE.Mesh = new THREE.Mesh(SPGeometry, SPMaterial);
    scene.add(dome);

    scene.add(earth);

    // 地面
    const plane: THREE.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.5 * r, 2.5 * r, 2),
        new THREE.MeshBasicMaterial({
            color: 0x0f0f0f,
        })
    );
    plane.rotation.x = Math.PI / -2;
    scene.add(plane);

    // 平行光源
    const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(
        0xffffff
    );
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

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

    setView();

    // // 視点の切り替え（引数：視点1/3）
    // const controlFunction = (view: 1 | 3) => {
    //     const switchButton: HTMLInputElement = <HTMLInputElement>(
    //         document.getElementById('earthSwitch')
    //     );
    //     const resetButton: HTMLElement = <HTMLElement>(
    //         document.getElementById('resetButton')
    //     );
    //     if (view == 3) {
    //         switchButton.classList.remove('display_none');
    //         switchButton.value = 'true';
    //         resetButton.classList.remove('display_none');
    //         scene.add(earth);
    //     } else if (view == 1) {
    //         switchButton.classList.add('display_none');
    //         switchButton.value = 'false';
    //         resetButton.classList.add('display_none');
    //         scene.remove(earth);
    //     }
    // };

    // // 視点変更
    // const toggleViewDom: HTMLElement = <HTMLElement>(
    //     document.getElementById('toggleView')
    // );
    // // 現在の視点
    // let viewStatus: 1 | 3 = 1;
    // toggleViewDom.addEventListener('click', (): void => {
    //     toggleViewDom.textContent = `${viewStatus}人称視点に変更`;
    //     viewStatus = viewStatus === 3 ? 1 : 3;
    //     controlFunction(viewStatus);
    // });
    // controlFunction(viewStatus);

    // 地球表示切替
    document
        .querySelector('#earthToggle')
        ?.addEventListener('change', (): void => {
            const Toggler: HTMLInputElement = <HTMLInputElement>(
                document.querySelector('#earthToggle')
            );
            const status = Toggler.checked;
            if (status) {
                scene.add(earth);
                Toggler.checked = true;
            } else {
                scene.remove(earth);
                Toggler.checked = false;
            }
        });

    // 視点リセット
    document
        .getElementById('resetButton')
        ?.addEventListener('click', (): void => {
            control3.reset();
            console.log('reset');
        });

    // フレーム更新
    const tick = (): void => {
        control3.update();
        renderer.render(scene, viewStatus === 3 ? camera3 : camera1);
        requestAnimationFrame(tick);
        directionalLight.position.copy(camera3.position);
        if (viewStatus === 1) {
            raycast.setFromCamera(mouse, camera3);
            const intersects: THREE.Intersection[] = raycast.intersectObjects(
                sprites
            );
            sprites.map((mesh) => {
                if (intersects.length > 0 && mesh === intersects[0].object) {
                    document.querySelector('.info-pannel_title')!.textContent =
                        mesh.name;
                    console.log(mesh);
                }
            });
        }
    };

    tick();

    // リサイズ
    window.addEventListener('resize', (): void => {
        // サイズの取得
        width = window.innerWidth;
        height = window.innerHeight;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        camera3.aspect = width / height;
        camera3.updateProjectionMatrix();
        camera1.aspect = width / height;
        camera1.updateProjectionMatrix();
    });

    // fps
    fps();
}
