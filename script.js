document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#button');
    const placeTwo = document.querySelector('.placeTwo');
    const buttonNext = document.querySelector('#buttonNext');
    const placeThree = document.querySelector('.placeThree');

    if (button) {
        button.addEventListener('click', () => {
            placeTwo.style.display = 'block';
        });
    }

    if (buttonNext) {
        buttonNext.addEventListener('click', () => {
            placeThree.style.display = 'block';
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const maze = document.getElementById("maze");
    const scoreEl = document.getElementById("score");
    const restartBtn = document.getElementById("restartGame");

    if (!maze || !scoreEl) {
        console.log('Элементы лабиринта не найдены');
        return;
    }

    let score = 0;
    let gameStarted = false;  // Флаг: игра началась?

    const initialMap = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,1,1,0,1,4,1],
        [1,0,1,2,0,0,0,1,0,1],
        [1,0,1,0,1,1,0,0,0,1],
        [1,0,0,0,1,0,2,1,1,1],
        [1,0,1,1,1,0,1,0,0,1],
        [1,0,2,0,0,0,1,2,0,1],
        [1,1,1,0,1,0,0,0,1,1],
        [1,0,0,0,1,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ];
    
    let map = JSON.parse(JSON.stringify(initialMap));
    let mousePos = { x: 1, y: 8 };

    function drawMaze() {
        maze.innerHTML = "";

        map.forEach((row, y) => {
            row.forEach((cell, x) => {
                const div = document.createElement("div");
                div.classList.add("cell");

                if (cell === 1) div.classList.add("wall");
                if (cell === 0) div.classList.add("path");
                if (cell === 2) div.classList.add("cheese");
                if (cell === 4) div.classList.add("exit");

                // Показываем мышку ТОЛЬКО если игра началась
                if (x === mousePos.x && y === mousePos.y && gameStarted) {
                    div.classList.add("mouse");
                }

                maze.appendChild(div);
            });
        });
    }

    function moveMouse(dx, dy) {
        // Управление работает ТОЛЬКО после старта игры
        if (!gameStarted) return;

        const nx = mousePos.x + dx;
        const ny = mousePos.y + dy;

        if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length) return;

        const cell = map[ny][nx];
        if (cell === 1) return;
        
        let syr = Array.from(document.querySelectorAll(".chs"));
  let syrIndex = 0;
        if (cell === 2) {
            score += 10;
            scoreEl.textContent = score;
            map[ny][nx] = 0;
            if (cell === 2) {
      score += 10;
      scoreEl.textContent = score;

      map[ny][nx] = 0;

      // показываем сыр
      if (syrIndex < syr.length) {
        syr[syrIndex].classList.add("visible");
        syrIndex++;
      }
    }
        }

        if (cell === 4) {
            setTimeout(() => {
                alert(`Мышка добралась до выхода! Очки: ${score}`);
            }, 100);
        }

        mousePos.x = nx;
        mousePos.y = ny;
        drawMaze();
    }

    function resetGame() {
        score = 0;
        scoreEl.textContent = score;
        map = JSON.parse(JSON.stringify(initialMap));
        mousePos = { x: 1, y: 8 };
        drawMaze();
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', resetGame);
    }

    // Управление клавишами
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") moveMouse(0, -1);
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") moveMouse(0, 1);
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") moveMouse(-1, 0);
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") moveMouse(1, 0);

        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
        if (keys.includes(e.key)) {
        e.preventDefault();
  }
    });
    drawMaze();
    setTimeout(() => {
        gameStarted = true;
        drawMaze(); 
        console.log('Игра началась! Управляй мышкой стрелками!');
    }, 9000); 
});
console.log('загружен!');

document.addEventListener('DOMContentLoaded', () => {
    const igla = document.querySelector('.disco-igla');
    const startBtn = document.querySelector('.startButton');
    const stopBtn = document.querySelector('.stopButton');

    startBtn.addEventListener('click', () => {
        igla.classList.remove('igla-stop');
        igla.classList.add('igla-start');
    });

    stopBtn.addEventListener('click', () => {
        igla.classList.remove('igla-start');
        igla.classList.add('igla-stop');
    });
});

const audio = document.getElementById('player');
const startBtn = document.querySelector('.startButton');
const stopBtn = document.querySelector('.stopButton');

startBtn.addEventListener('click', () => {
    audio.play();
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0; // вернуть в начало
});
