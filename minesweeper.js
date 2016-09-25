document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
 var board = { cells: [] }
  //    {row: 0, col: 0, isMine: true, hidden: true},
  //    {row: 0, col: 1, isMine: true, hidden: true},
  //    {row: 0, col: 2, isMine: true, hidden: true},
  //    {row: 1, col: 0, isMine: true, hidden: true},
  //    {row: 1, col: 1, isMine: true, hidden: true},
  //    {row: 1, col: 2, isMine: true, hidden: true},
  //    {row: 2, col: 0, isMine: false, hidden: true},
  //    {row: 2, col: 1, isMine: false, hidden: true},
  //    {row: 2, col: 2, isMine: false, hidden: true},
   //
  //  ]

 function makeBoard(num) {
   //itereate to make rows and in each row iterate to make cells
   //declare cells as an empy array to push new objects to.
   //make a row
   for(var i = 0; i < num; i++) {
     //make cells in the row.
     for(var j = 0; j < num; j++) {
       board.cells.push({
         row: i,
         col: j,
         isMine: Math.random()>0.80,
         hidden: true
       })
     }
   }
 }





function startGame () {




//Ask the user what size grid that they want

var boardSize = prompt("What size square grid would you like? Please enter a number between 3 and 6" , "4");

while(isNaN(boardSize)) {
  boardSize = prompt("That's not a number Dude!" , "4");
}

//Now call a function to create the board from above information.

makeBoard(boardSize);






  document.addEventListener('click', checkForWin );
  document.addEventListener('contextmenu', checkForWin );
  document.addEventListener('click', resetGame);

  // Don't remove this function call: it makes the game work!
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i]["surroundingMines"] = countSurroundingMines(board.cells[i]);

  }
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  var winMine = 0;
  var winHide = 0;
  for (var i= 0; i<board.cells.length; i++){
    if(board.cells[i].isMine && board.cells[i].isMarked){
      winMine++;
    }else if (!board.cells[i].isMine && !board.cells[i].hidden) {
      winHide++;
    }
  }
  if (winHide == 3 || winMine == 6){
  lib.displayMessage('You win!');
  }
};
// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
    // var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0;
  for (var i = 0; i<surrounding.length; i++) {
    if(surrounding[i].isMine) {
      count++;
    }
  }
  return count;
}
