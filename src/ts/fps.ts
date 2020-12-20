export default function fps() {
    let fps = 0;
    const fpsFunc = (): void => {
        fps++;
        requestAnimationFrame(fpsFunc);
    };

    fpsFunc();

    const updateFps = () => {
        document.getElementById('fps')!.textContent = String(fps);
        fps = 0;
    };

    setInterval(updateFps, 1000);
}
