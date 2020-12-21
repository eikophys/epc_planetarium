import scene from './scene';
import earth from './earth';

const controlFunction = (view: 1 | 3): void => {
    const switchButton: HTMLInputElement = <HTMLInputElement>(
        document.getElementById('earthSwitch')
    );
    const resetButton: HTMLElement = <HTMLElement>(
        document.getElementById('resetButton')
    );
    if (view == 3) {
        switchButton.classList.remove('display_none');
        switchButton.value = 'true';
        resetButton.classList.remove('display_none');
        scene.add(earth);
    } else if (view == 1) {
        switchButton.classList.add('display_none');
        switchButton.value = 'false';
        resetButton.classList.add('display_none');
        scene.remove(earth);
    }
};

// 現在の視点
export let viewStatus: 1 | 3 = 1;
export function setView() {
    document
        .getElementById('toggleView')!
        .addEventListener('click', (): void => {
            document.getElementById(
                'toggleView'
            )!.textContent = `${viewStatus}人称視点に変更`;
            viewStatus = viewStatus === 3 ? 1 : 3;
            controlFunction(viewStatus);
        });
    controlFunction(viewStatus);
}
