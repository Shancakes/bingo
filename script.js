const bingoNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
const freeSpace = "Free Space";
const shuffledNumbers = shuffle(bingoNumbers);
const boardContainer = document.getElementById('board');
const drawnNumberDiv = document.getElementById('drawn-number'); // Updated variable name

// Creating the board
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

// Resetting the board
function resetBoard() {
    const reshuffledNumbers = shuffle(bingoNumbers);
    shuffledNumbers.length = 0;
    shuffledNumbers.push(...reshuffledNumbers);
    createBoard();
}

// Shuffling the numbers
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Drawing a number
function drawNumber() {
    const drawnNumber = Math.floor(Math.random() * 25) + 1;
    drawnNumberDiv.textContent = `Number drawn: ${drawnNumber}`;
    highlightSquare(drawnNumber);
    checkForWin();
}

// Highlighting the square red
function highlightSquare(number) {
    const boardItems = document.querySelectorAll('.board-item');
    for (let i = 0; i < boardItems.length; i++) {
        if (boardItems[i].textContent == number || boardItems[i].textContent === freeSpace) {
            boardItems[i].style.backgroundColor = 'red';
        }
    }
}

//all winning bingo line combinations
const bingoWinningLines = [
    // Horizontal lines
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // Vertical lines
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // Diagonal lines
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],


];


// Check for a win
function checkForWin() {
    const boardItems = document.querySelectorAll('.board-item');

    for (const line of bingoWinningLines) {
        const lineMatch = line.every(index => boardItems[index].style.backgroundColor === 'red');

        if (lineMatch) {
            // Highlight the winning squares in yellow
            for (const index of line) {
                boardItems[index].classList.add('winning-square');
                boardItems[index].style.backgroundColor = 'yellow';
            }
            // Display the winning message and reload the page on closing the alert
            alert("BINGO! YOU WON!");
            break; // Stop the loop
        }
    }
}

// Initialize the board
createBoard();