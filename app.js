let boxes = document.querySelectorAll(".box");
let result = document.querySelector(".result");
let resetbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new-game");
let turnO;

function checkChoice() {
    let choice = prompt("enter player one want to start with(O or X) : ");
    if(choice != null) {
        choice = choice.toUpperCase();
    }
    if(choice == 'O') {
        turnO = true;
    }
    else if(choice == 'X') {
        turnO = false;
    }
    else {
        alert("enter currect choice !");
        checkChoice();  
    }
}
checkChoice();

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log(turnO);
        if(turnO) {
            box.innerHTML = `O`;
            turnO = false;
            box.disabled = true;
            if(checkWinner()) {
                disableAll();
            };
        }
        else {
            box.innerHTML = `X`;
            turnO = true;
            box.disabled = true;
            if(checkWinner()) {
                disableAll();
            };
        }
    });
});

const isMatchTie = () => {
    let temp = true;
    boxes.forEach(box => {
        if(box.innerHTML === "") {
            temp = false;
        }
    })
    return temp;
}

// use of 2d array
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;
    
        if(pos1val !==""&&pos2val !=="" && pos3val !=="") {
            if(pos1val == pos2val && pos2val == pos3val) {
                result.innerHTML = `Congratulation ! Player ${pos1val} won the Game`;
                result.classList.remove('hidden');
                return 1;
            }
        }
    }
    if (isMatchTie()) {
        result.innerHTML = `Match is tie!`;
        result.classList.remove('hidden');
    }    
}
const resetBoard = () => {
    boxes.forEach(box => {
        box.innerHTML = '';
        box.disabled = false; 
    });
    result.classList.add('hidden');

};
resetbtn.addEventListener("click",() => {
    resetBoard();
})

const disableAll = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}
const resetGame = () => { // new game is clicked;
    boxes.forEach(box => {
        box.innerHTML = "";
        box.disabled = false; 
    });

    result.innerHTML = ""; 
    result.classList.add("hidden");
    checkChoice();
};

newGamebtn.addEventListener("click",() =>{ 
    resetGame();
});
