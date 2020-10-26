/**
 * @classdesc それぞれ各等級の星のリスト
 * @param {string} name 星の名前（日本語）
 * @param {Array.<number>} ra 赤経
 * @param {Array.<number>} dec 赤緯
 * @param {number} v 見かけの等級
 */
type stars_dataset = {
    name: string;
    ra: [number, number, number];
    dec: [number, number, number];
    v: number;
};

export const stars: stars_dataset[] = [
    {
        name: 'シリウス',
        ra: [6, 45, 8.91728],
        dec: [-16, 42, 58.017],
        v: 1.46,
    },
    {
        name: 'カノープス',
        ra: [6, 23, 57.10988],
        dec: [-52, 41, 44.381],
        v: -0.74,
    },
    {
        name: 'ポラリス',
        ra: [2, 31, 48.7],
        dec: [89, 15, 51],
        v: 1.46,
    },
];

// Demo Data
window.addEventListener('load', () => {
    for (let i = 0; i < 3000; i++) {
        stars.push({
            name: 'Demo',
            ra: [Math.random() * 24, Math.random() * 60, Math.random() * 60],
            dec: [
                Math.random() * 180 - 90,
                Math.random() * 100,
                Math.random() * 100,
            ],
            v: Math.random() * 6,
        });
    }

    fpsFunc();
});

let fps = 0;
const fpsFunc = (): void => {
    fps++;
    requestAnimationFrame(fpsFunc);
};

const updateFps = () => {
    document.getElementById('fps')!.textContent = String(fps);
    fps = 0;
};

setInterval(updateFps, 1000);
