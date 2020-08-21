const init = () => {
  let width  = window.innerWidth;
  let height  = window.innerHeight;
  const canvas = document.querySelector('#main');
  // シーン
  const scene = new THREE.Scene();
  
  // カメラ
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 1000);
  scene.add(camera)
  
  // レンダラー
  const renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  canvas.appendChild(renderer.domElement)
  

  // ドーナツを作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加;
  scene.add(mesh);
  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);


  // フレーム更新
  const tick = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
  
  tick();
}
