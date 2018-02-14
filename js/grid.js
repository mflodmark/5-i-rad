class Game {
    constructor() {
        this.grid = [];

        for (var i = 1; i <= 100; i++) {
            var obj = { cell: i, used: false, player: 0 }
            this.grid.push(obj);
        }
    }

    CreateGrid(canvas) {
        var c = canvas.getContext("2d");

        // Background
        c.fillStyle = "orange";
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Stroke color
        c.strokeStyle = "black";
        c.lineWidth = 1;

        // Width & Height
        var cellWidth = canvas.width / 10;
        var cellHeight = canvas.height / 10;
        c.beginPath();

        var array = new Array(11).fill('').map((x, i) => {
            var w = i * cellWidth;
            c.moveTo(w, 0);
            c.lineTo(w, canvas.width);
            c.stroke();

            var h = i * cellHeight;
            c.moveTo(0, h);
            c.lineTo(canvas.height, h);
            c.stroke();
        })
        c.closePath();
    }
}



