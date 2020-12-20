/**
 * @classdesc それぞれ各等級の星のリスト
 * @param {string} name 星の名前（日本語）
 * @param {Array.<number>} ra 赤経
 * @param {Array.<number>} dec 赤緯
 * @param {number} v 見かけの等級
 */
type stars_dataset = {
    ra: number;
    dec: number;
    pl_name: string;
    st_dist: number;
    st_optmag: number;
};

export const stars: stars_dataset[] = [];

// Demo Data
window.addEventListener('load', () => {
    for (let i = 0; i < 3000; i++) {
        stars.push({
            pl_name: `${Math.round(Math.random() * 100000)}`,
            ra: Math.random() * 360,
            dec: Math.random() * 180 - 90,
            st_optmag: Math.random() * 6,
            st_dist: 10,
        });
    }
});
