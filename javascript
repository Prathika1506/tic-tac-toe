const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');
const message = document.getElementById('message');

let currentPlayer = 'X';  // X starts the game
let board = ['', '', '', '', '', '', '', '', '']; // Empty board

// Check if someone has won
function checkWinner() {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombination) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check if the game is a tie
  if (!board.includes('')) {
    return 'Tie';
  }

  return null;
}

// Handle a cell click event
function handleCellClick(e) {
  const cellIndex = e.target.getAttribute('data-cell-index');
  if (board[cellIndex] || checkWinner()) return; // If the cell is already filled or the game is over

  // Fill the cell with the current player's mark
  board[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    if (winner === 'Tie') {
      message.textContent = 'It\'s a tie!';
    } else {
      message.textContent = `${winner} wins!`;
    }
  } else {
    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
}

// Attach event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Reset button functionality
resetButton.addEventListener('click', resetGame);
