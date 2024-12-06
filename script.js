let sonic = document.getElementById('sonic');
let eggman = document.getElementById('eggman');
let weight = document.getElementById('weight');
let strengthDisplay = document.getElementById('strength');
let gameContainer = document.getElementById('game-container');
let strength = 0;

const gameWidth = gameContainer.clientWidth;
const gameHeight = gameContainer.clientHeight;

function randomPosition() {
    const x = Math.floor(Math.random() * (gameWidth - 50));
    const y = Math.floor(Math.random() * (gameHeight - 50));
    return { x, y };
}

function spawnWeight() {
    let { x, y } = randomPosition();
    weight.style.left = `${x}px`;
    weight.style.top = `${y}px`;
}

function moveSonic() {
    document.addEventListener('keydown', (e) => {
        let sonicRect = sonic.getBoundingClientRect();
        let sonicX = sonicRect.left;
        let sonicY = sonicRect.top;

        switch (e.key) {
            case 'ArrowUp':
                if (sonicY > 0) sonic.style.top = `${sonicY - 5}px`;
                break;
            case 'ArrowDown':
                if (sonicY < gameHeight - 50) sonic.style.top = `${sonicY + 5}px`;
                break;
            case 'ArrowLeft':
                if (sonicX > 0) sonic.style.left = `${sonicX - 5}px`;
                break;
            case 'ArrowRight':
                if (sonicX < gameWidth - 50) sonic.style.left = `${sonicX + 5}px`;
                break;
        }

        checkCollision();
    });
}

function checkCollision() {
    let sonicRect = sonic.getBoundingClientRect();
    let weightRect = weight.getBoundingClientRect();

    if (sonicRect.left < weightRect.left + weightRect.width &&
        sonicRect.left + sonicRect.width > weightRect.left &&
        sonicRect.top < weightRect.top + weightRect.height &&
        sonicRect.top + sonicRect.height > weightRect.top) {
        
        strength += 10;
        strengthDisplay.textContent = strength;
        spawnWeight();
        if (strength >= 100) {
            fightEggman();
        }
    }
}

function fightEggman() {
    eggman.style.display = 'block';
    let sonicRect = sonic.getBoundingClientRect();
    let eggmanRect = eggman.getBoundingClientRect();

    let eggmanX = eggmanRect.left + eggmanRect.width / 2;
    let eggmanY = eggmanRect.top + eggmanRect.height / 2;

    document.addEventListener('keydown', (e) => {
        let sonicRect = sonic.getBoundingClientRect();
        let sonicX = sonicRect.left + sonicRect.width / 2;
        let sonicY = sonicRect.top + sonicRect.height / 2;

        let deltaX = eggmanX - sonicX;
        let deltaY = eggmanY - sonicY;

        if (Math.abs(deltaX) < 50 && Math.abs(deltaY) < 50) {
            alert("Sonic defeated Eggman!");
            resetGame();
        }
    });
}

function resetGame() {
    strength = 0;
    strengthDisplay.textContent = strength;
    sonic.style.left = '50px';
    sonic.style.top = '50px';
    spawnWeight();
    eggman.style.display = 'none';
}

spawnWeight();
moveSonic();
