const xClass = 'x'
const oClass = 'o'
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElement = document.querySelectorAll('[data-cell]')
const winningMsgTextElement = document.querySelector('[tic-wining-text]')
const winningMsgElement = document.querySelector('[winning-msg]')
const reststartButton = document.getElementById('restartbtn')
const tic = document.getElementById('tic')
let oturn

startGame()

reststartButton.addEventListener('click', startGame)

function startGame(){
    oturn = false
    cellElement.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.style.backgroundColor = '';
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setTicHoverClass()
    winningMsgElement.classList.remove('show')
}

function handleClick(e){
    // console.log("clicked");
    const cell = e.target
    const currentClass = oturn ? oClass : xClass

    //PLACING THE MARK
    placeMark(cell, currentClass)
    //CHECK FOR WIN
    if (checkWin(currentClass)){
        console.log("winner");
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else{
        swapTurns()
        setTicHoverClass()
    }
    //CHECK FOR DRAW
    //SWITCH TURNS
    
}

function endGame(draw) {
    if (draw) {
        winningMsgTextElement.innerText = `DRAW!`;
    } else {
        const currentClass = oturn ? oClass : xClass;
        winningMsgTextElement.innerText = `${oturn ? "O's" : "X's" } WINS!`;
        winningCombo.forEach(combo => {
            if (combo.every(index => cellElement[index].classList.contains(currentClass))) {
                // If the current combination contains all cells with the current class, color them green
                combo.forEach(index => {
                    cellElement[index].style.backgroundColor = 'lime';
                });
            }
        });
    }
    winningMsgElement.classList.add('show');
}


function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    oturn = !oturn
}
function setTicHoverClass() {
    tic.classList.remove(xClass)
    tic.classList.remove(oClass)
    if (oturn){
        tic.classList.add(oClass)
    } else {
        tic.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombo.some(combo => {
        if (combo.every(index => cellElement[index].classList.contains(currentClass))) {
            // If all cells in a combination have the current class, it's a win
            return true;
        }
        return false;
    });
}
