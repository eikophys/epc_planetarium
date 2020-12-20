import * as THREE from 'three';
import * as list from './list';

export default function drawStar(
    radius: number
): [THREE.Group, THREE.Sprite[]] {
    // 星のグループ
    const starsGroup: THREE.Group = new THREE.Group();
    // scene.add(starsGroup);

    const starMaterial: THREE.SpriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('img/star.png'),
    });

    const sprites: THREE.Sprite[] = [];

    // 星の描画
    for (let i = 0; i < list.stars.length; i++) {
        const sprite = new THREE.Sprite(starMaterial);

        // 赤経を角度に変換したもの(ラジアン)
        const ra: number = (list.stars[i].ra * Math.PI) / 180;
        // 赤緯を角度に変換したもの（ラジアン）
        const dec: number = (list.stars[i].dec * Math.PI) / 180;
        const position: readonly number[] = [
            radius * Math.cos(ra) * Math.cos(dec),
            radius * Math.sin(dec),
            radius * Math.cos(dec) * Math.sin(ra),
        ];
        sprite.name = list.stars[i].pl_name;

        sprite.position.copy(
            new THREE.Vector3(position[0], position[1], position[2])
        );

        // 星の大きさを計算
        const starScale: number = list.stars[i].st_optmag;
        sprite.scale.set(starScale, starScale, starScale);

        sprites.push(sprite);

        // グループに追加する
        starsGroup.add(sprite);
    }

    return [starsGroup, sprites];
}
