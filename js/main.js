const init = () => {
  let width  = window.innerWidth;
  let height  = window.innerHeight;
  const r = 200; // 半径
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

  // 星の描画
  for (let i = 0; i < stars.length; i++) {

    const sprite = new THREE.Sprite(starMaterial);
    
    // 赤経を角度に変換したもの(ラジアン)
    const ra = ((stars[i].ra[0] * (360/24) + stars[i].ra[1] * (360/24/60) + stars[i].ra[1] * (360/24/60) + stars[i].ra[2] * (360/24/60/60)) * Math.PI) / 180;
    // 赤緯を角度に変換したもの（ラジアン）
    const dec = ((stars[i].dec[0] + stars[i].dec[1] / 10 + stars[i].dec[2] / 100) * Math.PI) / 180
    const position = [r * Math.cos(ra) * Math.cos(dec), r * Math.sin(dec), r * Math.cos(dec) * Math.sin(ra)]
    console.log(position)

    sprite.position.copy(new THREE.Vector3(position[0], position[1], position[2]))

    // 星の大きさを計算
    const starScale = -5 * stars[i].v + 50;
    sprite.scale.set(starScale, starScale, starScale);

    // グループに追加する
    starsGroup.add(sprite);

  }

  // 地球
  const earthGeometry = new THREE.SphereGeometry(70, 30, 30);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('../img/earthmap1k.jpg')
  })
  const earth = new THREE.Mesh(earthGeometry, earthMaterial)
  scene.add(earth)

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  // フレーム更新
  const tick = () => {
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
    directionalLight.position.copy(camera.position)
  }

  const control = new THREE.OrbitControls(camera, renderer.domElement);

  control.noPan = true;
  control.enablePan = false
  control.minDistance = 200;
  control.maxDistance = 1000;
  control.enableDamping = true;
  control.dampingFactor = 0.1;

  // 視点リセット
  document.getElementById('resetButton').addEventListener('click', () => {
    camera.position.set(500, 500, 500)
  })

  
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
