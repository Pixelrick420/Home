const sortproject = document.getElementById('sort');

document.getElementById('linktowhatido').addEventListener('click', function(event) {
    event.preventDefault(); 
    const target = document.getElementById('whatido');
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - (window.innerHeight / 4) + (target.offsetHeight / 2);

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

sortproject.addEventListener('click', function() {
    window.open('https://pixelrick420.github.io/Sort');
});

document.getElementById('linktowhoiam').addEventListener('click', function(event) {
    event.preventDefault(); 
    const target = document.getElementById('whoiam');
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - (window.innerHeight / 4) + (target.offsetHeight / 2);

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

document.getElementById('linktoresume').addEventListener('click', function(event) {
    event.preventDefault(); 
    const target = document.getElementById('resume');
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - (window.innerHeight / 1.8) + (target.offsetHeight / 2);

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

document.getElementById('linktosocials').addEventListener('click', function(event) {
    event.preventDefault(); 
    const target = document.getElementById('socials');
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - (window.innerHeight / 1.8) + (target.offsetHeight / 2);

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

document.getElementById('downloadresume').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'resume.pdf'; 
    link.download = 'resume.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById('github').addEventListener('click', function() {
    window.open('https://github.com/Pixelrick420');
});

document.getElementById('linkedin').addEventListener('click', function() {
    window.open('https://www.linkedin.com/in/harikrishnan-r-41b1a3291/');
});

function createAndSort() {
    sortproject.innerHTML = '';
    const array = [];

    for (let i = 0; i < 7; i++) {
        const member = document.createElement('div');
        array.push(member);
        member.className = 'arraymember';
        sortproject.appendChild(member);
        member.style.height = Math.floor(Math.random() * 220 + 60).toString() + 'px';
    }

    let i = 0, j = 0;

    function bubbleSort() {
        if (i < array.length) {
            if (j < array.length - i - 1) {
                const h1 = parseInt(array[j].style.height);
                const h2 = parseInt(array[j + 1].style.height);
                if (h1 > h2) {
                    array[j].classList.add('selected');
                    array[j].style.height = h2 + 'px';
                    array[j + 1].style.height = h1 + 'px';
                }
                j++;
                setTimeout(bubbleSort, 100); 
                array[j].classList.remove('selected');
            } else {
                j = 0;
                i++;
                setTimeout(bubbleSort, 100); 
            }
        } else {
            i = 0;
            j = 0;

            setTimeout(createAndSort, 100);
        }
    }

    bubbleSort();
}

createAndSort();


const rows = 10;
const cols = 10;
const gameOfLife = document.querySelector('.gameoflife');
let grid = [];

gameOfLife.addEventListener('click', function() {
    window.open('https://pixelrick420.github.io/GameOfLife');
});
function initializeGrid() {
    gameOfLife.innerHTML = ''; 
    grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            if (Math.random() > 0.8) {
                cell.classList.add('alive');
                row.push(1); 
            } else {
                cell.classList.add('dead');
                row.push(0); 
            }
            gameOfLife.appendChild(cell);
        }
        grid.push(row);
    }
}

function getAliveNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue; 
            }
            const nx = x + i;
            const ny = y + j;
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                count += grid[nx][ny];
            }
        }
    }
    return count;
}

function updateGrid() {
    const newGrid = grid.map((row, x) => row.map((cell, y) => {
        const aliveNeighbors = getAliveNeighbors(x, y);
        if (cell === 1) {
            return aliveNeighbors < 2 || aliveNeighbors > 3 ? 0 : 1;
        } else {
            return aliveNeighbors === 3 ? 1 : 0;
        }
    }));

    let cellsChanged = false;

    Array.from(gameOfLife.children).forEach((cell, index) => {
        const x = Math.floor(index / cols);
        const y = index % cols;
        if (newGrid[x][y] === 1) {
            if (!cell.classList.contains('alive')) {
                cellsChanged = true;
            }
            cell.classList.add('alive');
            cell.classList.remove('dead');
        } else {
            if (cell.classList.contains('alive')) {
                cellsChanged = true;
            }
            cell.classList.add('dead');
            cell.classList.remove('alive');
        }
    });

    if (!cellsChanged) {
        initializeGrid();
    } else {
        grid = newGrid;
    }
}

function startGame(delay, generations) {
    let generationCount = 0;
    initializeGrid();
    const interval = setInterval(() => {
        if (generationCount >= generations) {
            clearInterval(interval);
        } else {
            updateGrid();
            generationCount++;
        }
    }, delay);
}

startGame(1000, 30);
