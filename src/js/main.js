const init = () => {
  let width  = window.innerWidth;
  let height  = window.innerHeight;
  const r = 200; // 半径
  const canvas = document.querySelector('#main');
  // シーン
  const scene = new THREE.Scene();
  
  // カメラ(1人称・3人称)
  const camera1 = new THREE.PerspectiveCamera(60, width / height);
  const camera3 = new THREE.PerspectiveCamera(45, width / height);
  camera3.position.set(500, 500, 500);
  camera3.lookAt(0, 0, 0)
  scene.add(camera3);
  camera1.aspect = 60
  camera1.position.set(0, 0, 0);
  scene.add(camera1);
  
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
    map: new THREE.TextureLoader().load('src/img/star.png')
  })

  // 星の描画
  for (let i = 0; i < stars.length; i++) {

    const sprite = new THREE.Sprite(starMaterial);
    
    // 赤経を角度に変換したもの(ラジアン)
    const ra = ((stars[i].ra[0] * (360/24) + stars[i].ra[1] * (360/24/60) + stars[i].ra[1] * (360/24/60) + stars[i].ra[2] * (360/24/60/60)) * Math.PI) / 180;
    // 赤緯を角度に変換したもの（ラジアン）
    const dec = ((stars[i].dec[0] + stars[i].dec[1] / 10 + stars[i].dec[2] / 100) * Math.PI) / 180
    const position = [r * Math.cos(ra) * Math.cos(dec), r * Math.sin(dec), r * Math.cos(dec) * Math.sin(ra)]

    sprite.position.copy(new THREE.Vector3(position[0], position[1], position[2]))

    // 星の大きさを計算
    const starScale = (stars[i].v -1) ;
    sprite.scale.set(starScale, starScale, starScale);

    // グループに追加する
    starsGroup.add(sprite);

  }

  // 地球
  const earthGeometry = new THREE.SphereGeometry(40, 30, 30);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('src/img/earthmap1k.jpg')
  })
  const earth = new THREE.Mesh(earthGeometry, earthMaterial)
  scene.add(earth)

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  let control3 = new THREE.OrbitControls(camera3, renderer.domElement);
  
  // 視点の切り替え（引数：視点1/3）
  const controlFunction = (view) => {
    const switchButton = document.getElementById('earthSwitch')
    const resetButton = document.getElementById('resetButton')
    if (view == 3) {
      control3 = new THREE.OrbitControls(camera3, renderer.domElement);
      switchButton.classList.remove('display_none')
      resetButton.classList.remove('display_none')
      control3.noPan = true;
      control3.enablePan = false
      control3.minDistance = 200;
      control3.maxDistance = 1000;
      control3.enableDamping = true;
      control3.dampingFactor = 0.1;
    } else if (view == 1) {
      control3 = new THREE.OrbitControls(camera1, renderer.domElement);
      switchButton.classList.add('display_none')
      resetButton.classList.add('display_none')
      control3.target.set(
        camera1.position.x + 0.01,
        camera1.position.y,
        camera1.position.z
      );
      control3.enableDamping = true;
      control3.dampingFactor = 1;
    }
  }
    
  // 視点変更
  const toggleViewDom = document.getElementById('toggleView')
  // 現在の視点
  let viewStatus = 3
  toggleViewDom.addEventListener('click', () => {
    if (viewStatus === 3) {
      toggleViewDom.textContent = '3人称視点に変更';
      viewStatus = 1;
    } else {
      toggleViewDom.textContent = '1人称視点に変更';
      viewStatus = 3;
    }
    controlFunction(viewStatus)
  })
 
  // 地球表示切替
  document.querySelector('#earthToggle').addEventListener('change', () => {    
    const Toggler = document.querySelector('#earthToggle')
    const status= Toggler.checked
    if (status) {
      scene.add(earth)
      Toggler.checked = true;
    } else {
      scene.remove(earth)
      Toggler.checked = false;
    }
  })

  
  const resetView = () => {
    camera3.position.set(500, 500, 500);
    control3.target.set(0, 0, 0)
  }

  // 視点リセット  
  document.getElementById('resetButton').addEventListener('click', resetView())

  
  // フレーム更新
  const tick = () => {
    control3.update()
    if (viewStatus == 3) {
      renderer.render(scene, camera3);
    } else {
      renderer.render(scene, camera1);
    }
    requestAnimationFrame(tick);
    directionalLight.position.copy(camera3.position);
  }
  
  tick();
  
  // リサイズ
  window.addEventListener('resize', () => {
    // サイズの取得
    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera3.aspect = width / height;
    camera3.updateProjectionMatrix();
    camera1.aspect = width / height;
    camera1.updateProjectionMatrix();
  })
}

