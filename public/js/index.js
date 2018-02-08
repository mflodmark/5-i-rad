var game = new Game();

$("#refresh").click(function () {
    var canvas = document.getElementById("grid")
    var turn = document.getElementById("turn");

    turn.innerText = 0;

    game = new Game();
    game.CreateGrid(canvas);
})

window.onload = function () {
    var canvas = document.getElementById("grid")

    canvas.addEventListener('click', HandleClick);

    game.CreateGrid(canvas);
};

function HandleClick(e) {
    var canvas = document.getElementById("grid");
    var turn = document.getElementById("turn");
    var c = canvas.getContext("2d");
    var boxSize = canvas.width / 10;
    var x = Math.floor(e.offsetX / boxSize) * boxSize;
    var y = Math.floor(e.offsetY / boxSize) * boxSize;
    c.lineWidth = 5;

    var cell = document.getElementById("clicked-cell");
    var cellNr = GetCell(x, y, boxSize);
    cell.innerText = cellNr

    if (game.grid[cellNr - 1]["used"] == false) {
        // Update grid used 
        game.grid[cellNr - 1]["used"] = true;
        document.addEventListener('click', ToggleClickState, true);

        if (turn.innerText % 2 == 0) {
            // Update grid player
            game.grid[cellNr - 1]["player"] = 1;

            // Create X        
            c.beginPath();
            c.strokeStyle = "blue";
            var counter = 0;
            var interval = 10;
            var padding = 10;

            var intervalId = setInterval(function () {
                counter += 1;
                c.moveTo(x + padding, y + padding);
                c.lineTo(x + counter + padding, y + counter + padding);
                c.stroke();

                if (counter + padding * 2 == boxSize) {
                    clearInterval(intervalId)
                    var counter2 = 0;
                    var intervalId2 = setInterval(function () {
                        counter2 += 1;
                        c.moveTo(x + boxSize - padding, y + padding);
                        c.lineTo(x + boxSize - counter2 - padding, y + counter2 + padding);
                        c.stroke();

                        if (counter2 + padding * 2 == boxSize) {
                            clearInterval(intervalId2);
                            document.removeEventListener('click', ToggleClickState, true);
                            CheckWinner(cellNr, 1);
                        }
                    }, interval);
                }
            }, interval);
            c.closePath();
        } else {
            // Update grid player
            game.grid[cellNr - 1]["player"] = 2;

            // Create O                
            var counter3 = 0;

            var intervalId3 = setInterval(function () {
                counter3 += 0.5;
                var start = 0;

                c.clearRect(x + 5, y + 5, boxSize - 10, boxSize - 10)
                c.beginPath();
                c.strokeStyle = "green";
                c.arc(x + boxSize / 2, y + boxSize / 2, boxSize / 3, start, counter3);
                c.stroke();
                c.closePath();

                if (counter3 > 2 * Math.PI) {
                    clearInterval(intervalId3);
                    document.removeEventListener('click', ToggleClickState, true);
                    CheckWinner(cellNr, 2);
                }
            }, 40);
        }
        turn.innerText = Number(turn.innerText) + 1;
    }
}

function GetCell(x, y, boxSize) {
    var w = x / boxSize + 1;
    var h = y / boxSize;

    return w + h * 10;
}

function CheckWinner(cellNr, player) {
    var row = Math.ceil((cellNr / 10))
    var col = Math.ceil((cellNr % 10))
    var diagonal =

        console.log("Row = " + row)
    console.log("Col = " + col)

    // Check winner in row
    var times = 0
    game.grid.map((p, i) => {
        if (Math.ceil(((i + 1) / 10)) == row) {
            if (p["player"] == player) {
                console.log("Player " + player + " har klickat på rad " + row)
                times += 1
                if (times == 5) { alert("Winner is " + player) }
            } else {
                times = 0
            }
        }
    })

    // Check winner in col    
    times = 0
    game.grid.map((p, i) => {
        if (Math.ceil(((i + 1) % 10)) == col) {
            if (p["player"] == player) {
                console.log("Player " + player + " har klickat på col " + col)
                times += 1
                if (times == 5) { alert("Winner is " + player) }
            } else {
                times = 0
            }
        }
    })

    // Check winner in diagonal    
    times = 0
    game.grid.map((p, i) => {
        game.grid.map((p, indx) => {
            if (i == (indx - 11)) {
                if (p["player"] == player) {
                    console.log("Player " + player + " har klickat på diagonal ")
                    times += 1
                    if (times == 5) { alert("Winner is " + player) }
                } else {
                    times = 0
                }
            }
        })
    })
}

function ToggleClickState(e) {
    e.stopPropagation();
    e.preventDefault();
}

