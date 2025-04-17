let playerPosition = { x: 0, y: 0 };
let catPosition = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };
let zombiePosition = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };

const currentPosImg = document.getElementById('currentPosImg');
let mapGrid = Array.from({ length: 5 }, () => Array(5).fill(null));

let sessionImages = JSON.parse(sessionStorage.getItem('images')) === null ? [] : JSON.parse(sessionStorage.getItem('images'));

console.log(sessionImages.length);
if (sessionImages === null || sessionImages.length === 0) {
    addSessionImages();
}
function addSessionImages() {
    for (let i = 0; i < 25; i++) {
        sessionImages.push(`https://picsum.photos/seed/${Math.floor(Math.random() * 100)}/500?random=${i}`);
    }
    sessionStorage.setItem('images', JSON.stringify(sessionImages));
}

let imageIndex = 0;
for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        mapGrid[y][x] = sessionImages[imageIndex++];
    }
}
currentPosImg.src = mapGrid[playerPosition.y][playerPosition.x];

function renderMap() {
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = '';

    for (let y = 0; y < 5; y++) {
        const row = document.createElement('tr');
        for (let x = 0; x < 5; x++) {
            const cell = document.createElement('td');
            cell.style.width = '50px';
            cell.style.height = '50px';
            cell.style.textAlign = 'center';
            cell.style.fontSize = '24px';

            if (playerPosition.x === x && playerPosition.y === y) {
                cell.textContent = '🧍';
            } else if (catPosition.x === x && catPosition.y === y) {
                cell.textContent = '🐱';
            } else if (zombiePosition.x === x && zombiePosition.y === y) {
                cell.textContent = '🧟';
            } else {
                cell.textContent = '🌲';
            }

            row.appendChild(cell);
        }
        mapContainer.appendChild(row);
    }
}
renderMap();

function showCatOrZombie() {
    if (playerPosition.x === catPosition.x && playerPosition.y === catPosition.y) {
        const catImg = document.createElement('img');
        catImg.src = "images/katt.png";
        catImg.style.position = 'absolute';
        catImg.style.left = '50%';
        catImg.style.top = `100%`;
        catImg.style.transform = 'translate(-50%, -100%)';
        document.getElementById('imgContainer').appendChild(catImg);
    }
    if (playerPosition.x === zombiePosition.x && playerPosition.y === zombiePosition.y) {
        const zombieImg = document.createElement('img');
        zombieImg.src = "images/zombie.png";
        zombieImg.style.position = 'absolute';
        zombieImg.style.left = '50%';
        zombieImg.style.top = `100%`;
        zombieImg.style.transform = 'translate(-50%, -100%)';
        document.getElementById('imgContainer').appendChild(zombieImg);
    }
}

function movePlayer(direction) {
    if (direction === 'up' && playerPosition.y > 0) playerPosition.y--;
    if (direction === 'down' && playerPosition.y < 4) playerPosition.y++;
    if (direction === 'left' && playerPosition.x > 0) playerPosition.x--;
    if (direction === 'right' && playerPosition.x < 4) playerPosition.x++;

    moveZombie();
    printPositions();
    showCatOrZombie();
    renderMap();
    checkGameState();
}

function printPositions() {
    currentPosImg.src = mapGrid[playerPosition.y][playerPosition.x];
}

function moveZombie() {
    if (Math.random() < 0.3) {
        if (zombiePosition.x < playerPosition.x) zombiePosition.x++;
        else if (zombiePosition.x > playerPosition.x) zombiePosition.x--;

        if (zombiePosition.y < playerPosition.y) zombiePosition.y++;
        else if (zombiePosition.y > playerPosition.y) zombiePosition.y--;
    }
}

let score = sessionStorage.getItem('score') ? parseInt(sessionStorage.getItem('score')) : 0;
document.getElementById('score').innerText = `Poäng: ${score}`;

function updateScore(points) {
    if (points === 0) { score = 0; }
    else { score += points; }
    sessionStorage.setItem('score', score);
    document.getElementById('score').innerText = `Poäng: ${score}`;
}
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
document.getElementById('highScore').innerText = `Highscore: ${highScore}`;

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('highScore').innerText = `Highscore: ${highScore}`;
    }
}

function checkGameState() {
    if (playerPosition.x === catPosition.x && playerPosition.y === catPosition.y) {
        updateScore(1);
        updateHighScore();
        setTimeout(() => {
            alert('Du hittade en katt! Hitta fler innan zombien kommer!');
            resetGame();
        }, 500);
    } else if (playerPosition.x === zombiePosition.x && playerPosition.y === zombiePosition.y) {
        updateScore(0);
        setTimeout(() => {
            alert('Zombien fick tag på dig! Spelet är över!');
            resetGame();
            sessionStorage.clear();
        }, 500);
    }
}

function resetGame() {
    playerPosition = { x: 0, y: 0 };
    catPosition = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };
    zombiePosition = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };
    location.reload();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') movePlayer('up');
    if (event.key === 'ArrowDown') movePlayer('down');
    if (event.key === 'ArrowLeft') movePlayer('left');
    if (event.key === 'ArrowRight') movePlayer('right');
});