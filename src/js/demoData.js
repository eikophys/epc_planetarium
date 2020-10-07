window.addEventListener('load', () => {
  console.log('i')
  for (let i = 0; i < 3000; i++) {
    stars.push({
      'name' : 'Demo',
      'ra' : [Math.random() * 24, Math.random() * 60, Math.random() * 60],
      'dec' : [Math.random() * 180 - 90, Math.random() * 100, Math.random() * 100],
      'v' : Math.random() * 6
    })
  };

  fpsFunc()
})

let fps = 0;
const fpsFunc = () => {
  fps++;
  requestAnimationFrame(fpsFunc);
}

const updateFps = () => {
  document.getElementById('fps').textContent = fps;
  fps = 0;
}

setInterval(updateFps, 1000)