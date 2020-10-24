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
  console.log(typeof(camera1));
  camera3.position.set(500, 500, 500);
  camera3.lookAt(0, 0, 0)
  scene.add(camera3);
  camera1.aspect = 60
  camera1.position.set(0, 100, 0);
  scene.add(camera1);

  // レイキャスト
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseMove = event => {
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = (event.clienY / height) * 2 + 1;
  }
  
  // レンダラー
  const renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  canvas.appendChild(renderer.domElement);

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

  // 地面
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5 * r, 2.5 * r, 2),
    new THREE.MeshBasicMaterial({
      color : 0x0F0F0F
    })
  )
  plane.rotation.x = Math.PI / -2
  scene.add(plane)

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  const control3 = new THREE.OrbitControls(camera3, renderer.domElement);
  const control1 = new THREE.OrbitControls(camera1, renderer.domElement);
  control3.noPan = true;
  control3.enablePan = false  
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
  
  // 視点の切り替え（引数：視点1/3）
  const controlFunction = (view) => {
    const switchButton = document.getElementById('earthSwitch');
    const resetButton = document.getElementById('resetButton');
    if (view == 3) {
      switchButton.classList.remove('display_none');
      switchButton.value = true
      resetButton.classList.remove('display_none');
      scene.add(earth)
    } else if (view == 1) {
      switchButton.classList.add('display_none')
      switchButton.value = false
      resetButton.classList.add('display_none')
      scene.remove(earth)
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
        
  // 視点リセット
  document.getElementById('resetButton').addEventListener('click', () => {
    control3.reset()
  })

  // フレーム更新
  const tick = () => {
    control3.update()
    renderer.render(scene, viewStatus === 3 ? camera3 : camera1)
    requestAnimationFrame(tick);
    directionalLight.position.copy(camera3.position);

    // レイキャスト
    raycaster.setFromCamera( mouse, camera1);
    const intersects = raycaster.intersectObjects(scene.children);
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

