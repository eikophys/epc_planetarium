const init = () => {
  let width  = window.innerWidth;
  let height  = window.innerHeight;
  const r = 200;
  const canvas = document.querySelector('#main');
  // シーン
  const scene = new THREE.Scene();
  
  // カメラ
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(500, 500, 500);
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

  const starMaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load('../img/star.png')
  })
  for (let i = 0; i < stars.length; i++) {

    const sprite = new THREE.Sprite(starMaterial);

    const radian = (i / stars.length) * Math.PI * 2;
    sprite.position.x = r * Math.cos(radian); 
    sprite.position.y = 30;
    sprite.position.z = r * Math.sin(radian);
    // 星の大きさを計算
    const starScale = -5 * stars[i].v + 50;
    sprite.scale.set(starScale, starScale, starScale);

    // グループに追加する
    starsGroup.add(sprite);
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
