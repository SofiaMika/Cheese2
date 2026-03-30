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
     document.querySelectorAll(".maze-controls button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.dir;
      if (dir === "up") moveMouse(0, -1);
      if (dir === "down") moveMouse(0, 1);
      if (dir === "left") moveMouse(-1, 0);
      if (dir === "right") moveMouse(1, 0);
    });
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

document.addEventListener('DOMContentLoaded', () => {
    const whiteKeys = document.querySelectorAll('.musicNote');
    const blackKeys = document.querySelectorAll('.musicSharp');
    const allKeys = [...whiteKeys, ...blackKeys];  //массив
    
    const loadingText = document.createElement('div');
    
    loadingText.style.cssText = `
        position: fixed;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #EE4F28;
        color: #ece94a;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 26px;
        z-index: 9999;
        display: none;
    `;
    loadingText.textContent = 'Загрузка звуков...';
    document.body.appendChild(loadingText);
    
    if (typeof Tone === 'undefined') {
        console.error('Tone.js не загружен!');
        alert('Ошибка: Tone.js не загружен! Добавь <script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script> в HTML');
        return;
    }

    console.log('Найдено клавиш:', allKeys.length);

    let synth = null;
    let isReady = false;

    allKeys.forEach(key => {
        key.addEventListener('click', async () => {
            try {
                if (!synth) {
                    loadingText.style.display = 'block';
                    
                    await Tone.start();
                    await Tone.context.resume();
                    
                    synth = new Tone.Sampler({
                        urls: {
                            "C4": "C4.mp3",
                            "D#4": "Ds4.mp3",
                            "F#4": "Fs4.mp3",
                            "A4": "A4.mp3",
                            "C5": "C5.mp3"
                        },
                        release: 2,
                        baseUrl: "https://tonejs.github.io/audio/salamander/",
                        
                        onload: () => {
                            console.log('Sampler готов!');
                            isReady = true;
                            loadingText.textContent = 'Готово!';
                            setTimeout(() => {
                                loadingText.style.display = 'none';
                            }, 500);
                        }
                        
                    }).toDestination();
                    
                    const reverb = new Tone.Reverb(1.5).toDestination();
                    synth.connect(reverb);
                    
                    console.log('Sampler создан, загрузка');
                }

                if (!isReady) {
                    console.log('Ещё загружается');
                    return;
                }

                // нота из data-note
                const note = key.dataset.note;
                console.log('Играю:', note);
                
                //нота
                synth.triggerAttackRelease(note, '2n');
                
                // вижуал эффект
                const isBlackKey = key.classList.contains('musicSharp');
                
                if (isBlackKey) {
                    //диезы
                    key.style.backgroundColor = '#ff9966';
                } else {
                    // обычные клавиши
                    key.style.backgroundColor = '#6b4fc2';
                }
                
                setTimeout(() => {
                    if (isBlackKey) {
                        key.style.backgroundColor = '#e0552d';
                    } else {
                        key.style.backgroundColor = '#2d2355';
                    }
                }, 200);

            } catch (error) {
                console.error('Ошибка:', error);
                loadingText.textContent = 'Ошибка загрузки';
                loadingText.style.backgroundColor = '#e0552d';
            }
        });
    });
    document.addEventListener('keydown', (e) => {
        if (!isReady) return;
        
        // Находим клавишу по data-key
        const key = document.querySelector(`[data-key="${e.key}"]`);
        
        if (key) {
            const note = key.dataset.note;
            synth.triggerAttackRelease(note, '2n');
            
            // визуал
            const isBlackKey = key.classList.contains('musicSharp');
            key.style.backgroundColor = isBlackKey ? '#ff9966' : '#6b4fc2';
            
            setTimeout(() => {
                key.style.backgroundColor = isBlackKey ? '#e0552d' : '#2d2355';
            }, 200);
            
            console.log('Клавиша:', e.key, '→ Нота:', note);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
const empty = document.getElementById('emptyFridge');
const full = document.getElementById('fullFridge');

// пример — через 3 секунды
setTimeout(() => {
    empty.classList.add('hidden');
    full.classList.remove('hidden');
}, 3000);
});


document.addEventListener('DOMContentLoaded', () => {
let count = 0;
const likeBtn = document.getElementById('like');
const likeText = document.getElementById('likeText');

likeBtn.addEventListener('click', () => {
    count++;
    likeText.textContent = 'лайков: ' + count;
});
});

