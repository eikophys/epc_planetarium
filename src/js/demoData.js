window.addEventListener('load', () => {
  console.log('i')
  for (let i = 0; i < 5000; i++) {
    stars.push({
      'name' : 'Demo',
      'ra' : [Math.random() * 24, Math.random() * 60, Math.random() * 60],
      'dec' : [Math.random() * 180 - 90, Math.random() * 100, Math.random() * 100],
      'v' : Math.random() * 6
    })
  };

  fpsFunc()
})

let fps = [];
const fpsFunc = () => {
  fps.push('')
  requestAnimationFrame(fpsFunc);
}

const updateFps = () => {
  document.getElementById('fps').textContent = fps.length
  fps = []
}

setInterval(updateFps, 1000)