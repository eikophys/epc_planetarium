const init = () => {
  let width  = window.innerWidth;
  let height  = window.innerHeight;
  const canvas = document.querySelector('#main');
  // シーン
  const scene = new THREE.Scene();
  
  // カメラ
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(500, 500, 1000);
  camera.lookAt(0, 0, 0)
  scene.add(camera);
  
  // レンダラー
  const renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  canvas.appendChild(renderer.domElement);

  // 地面を作成
  scene.add(new THREE.GridHelper(600));
  scene.add(new THREE.AxesHelper(600));

  // 星のグループ
  const starsGroup = new THREE.Group();
  scene.add(starsGroup)

  for (let i = 0; i < 10; i++) {
    const material = new THREE.MeshNormalMaterial();
    const geometry = new THREE.BoxGeometry(40, 40, 40);
    const mesh = new THREE.Mesh(geometry, material);

    const radian = (i / 10) * Math.PI * 2;
    mesh.position.set(
      200 * Math.cos(radian), 
      30, 
      200 * Math.sin(radian) 
    );

    // グループに追加する
    starsGroup.add(mesh);
  }

  // フレーム更新
  const tick = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
  
  tick();

  // リサイズ
  window.addEventListener('resize', () => {
    // サイズの取得
    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  })
}
