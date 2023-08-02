const bingoNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
const freeSpace = "Free Space";
const shuffledNumbers = shuffle(bingoNumbers);
const boardContainer = document.getElementById('board');
const drawnNumberDiv = document.getElementById('drawn-number');

function createBoard() {
    boardContainer.innerHTML = '';

    for (let i = 0; i < shuffledNumbers.length; i++) {
        const boardItem = document.createElement('div');
        boardItem.classList.add('board-item');
        boardItem.textContent = i === 12 ? freeSpace : shuffledNumbers[i];
        boardItem.classList.add(i === 12 ? 'free-space' : 'board-item');
        boardContainer.appendChild(boardItem);
    }
}

function resetBoard() {
    const reshuffledNumbers = shuffle(bingoNumbers);
    shuffledNumbers.length = 0;
    shuffledNumbers.push(...reshuffledNumbers);
    createBoard();
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function drawNumber() {
    const drawnNumber = Math.floor(Math.random() * 25) + 1;
    drawnNumberDiv.textContent = `Number drawn: ${drawnNumber}`;
    highlightSquare(drawnNumber);
}

function highlightSquare(number) {
    const boardItems = document.querySelectorAll('.board-item');
    for (let i = 0; i < boardItems.length; i++) {
        if (boardItems[i].textContent == number) {
            boardItems[i].style.backgroundColor = 'red';
        }
    }
}

const bingoWinningLines = [
    [0, 1, 2, 3, 4],           // Top row
    [5, 6, 7, 8, 9],           // Second row
    [10, 11, 12, 13, 14],      // Third row
    [15, 16, 17, 18, 19],      // Fourth row
    [20, 21, 22, 23, 24],      // Bottom row
    [0, 5, 10, 15, 20],        // First column
    [1, 6, 11, 16, 21],        // Second column
    [2, 7, 12, 17, 22],        // Third column
    [3, 8, 13, 18, 23],        // Fourth column
    [4, 9, 14, 19, 24],        // Fifth column
    [0, 6, 12, 18, 24],        // Diagonal from top-left to bottom-right
    [4, 8, 12, 16, 20],        // Diagonal from top-right to bottom-left
    // Include the Free Space (center square) in all combinations
    [0, 1, 2, 3, 4, 6],        // Top row with Free Space
    [0, 1, 2, 3, 4, 12],       // Top row with Free Space
    [0, 5, 10, 15, 20, 12],    // First column with Free Space
    [20, 21, 22, 23, 24, 12],  // Bottom row with Free Space
    [4, 9, 14, 19, 24, 12],    // Fifth column with Free Space
    [0, 6, 12, 18, 24, 1],     // Diagonal from top-left to bottom-right with Free Space
    [4, 8, 12, 16, 20, 3]      // Diagonal from top-right to bottom-left with Free Space
];


//highlight the winning bingo line in yellow
function checkForWin() {
    const boardItems = document.querySelectorAll('.board-item');

    for (const line of bingoWinningLines) {
        const lineMatch = line.every(index => boardItems[index].style.backgroundColor === 'red');

        if (lineMatch) {
            // Highlight the winning squares in yellow
            for (const index of line) {
                boardItems[index].classList.add('winning-square');
            }

            // Display the winning message and reload the page on closing the alert
            alert("BINGO! YOU WON!");
            location.reload();
            break;
        }
    }
}
// Modal functions
function showModal() {
    const modal = document.getElementById('bingo-modal');
    modal.style.display = 'block';
}

//Closing the modal refreshes the page
function closeModal() {
    location.reload();
}

function drawNumber() {
    const drawnNumber = Math.floor(Math.random() * 25) + 1;
    drawnNumberDiv.textContent = `Number drawn: ${drawnNumber}`;
    highlightSquare(drawnNumber);
    checkForWin();
}



createBoard();
