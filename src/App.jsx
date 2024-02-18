import p5 from "p5";

export default function App() {
  let cel = 5;
  let hueValue = 100;
  let cols, rows;
  
  const make2DArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
  };

  let grid =make2DArray();

  const drawSand = (x, y, matrix = 5) => {
    let mouseCol = p5js.floor(x, cel);
    let mouseRow = p5js.floor(y, cel);

    let extent = p5js.floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (p5js.random(1) < 0.75) {
          let col = mouseCol + i;
          let row = mouseRow + j;

          if (withinCols(col) && withinRows(row)) {
            grid[col][row] = hueValue;
          }
        }
      }
    }
  };

  const withinCols = (i) => {
    return i >= 0 && i <= cols - 1;
  };

  const withinRows = (i) => {
    return i >= 0 && i <= rows - 1;
  };

  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(600,800);
      p.colorMode(p.HSB, 360, 255, 255);
      cols = p.width / cel;
      rows = p.height / cel;
      grid = make2DArray(cols, rows);
    };

    p.draw = () => {
      p.background(0);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          p.noStroke();
          if (grid[i][j] > 0) {
            p.fill(grid[i][j], 255, 255);
            let x = i * cel;
            let y = j * cel;
            p.square(x, y, cel);
          }
        }
      }

      if (p.mouseIsPressed) {
        drawSand(p.mouseX, p.mouseY);
      }
    };
  };

  const p5js = new p5(Sketch);

  return <div></div>;
}
