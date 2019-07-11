class POV {

  private grid: number[][];
  private size: number;
  private listRay: number[][][];

  constructor(size: number) {
    this.size = size;

    this.initialize();
  }

  public get getListRayon() {
    return this.listRay.map(r => r.map(c => c.map(n => Math.abs(n))));
  }

  private initialize() {
    this.grid = [];

    for (let line = 0; line < this.size; line++) {
      const arr = [];
      for (let column = 0; column < this.size; column++) {
        arr.push(0);
      }
      this.grid.push(arr);
    }
  }

  public run() {
    const cases = [];

    for (let i = 0; i < this.size; i++) {
      cases.push([i, this.size - 1]);
      cases.push([this.size - 1, i]);
    }
    this.listRay = [];

    this.launch(cases);

    let recurse = true;
    do {
      const testCase = this.recurse(0, this.grid);

      if (testCase == false) {
        recurse = false;
      } else {
        this.launch([testCase]);
      }
    } while (recurse);

    //return this.listRay;
  }

  private launch(cases) {

    //const length = this.grid.length;
    //const center = Math.floor(length / 2);

    cases.forEach(rayon => {
      const position_x = rayon[0];
      const position_y = rayon[1];
      const line: number[][] = this.bresenham(0, 0, position_x, position_y, false);

      line.push([position_x, position_y]);

      //const current_ray = [];

      let color = 1;

      line.forEach(point => {
        const x = Math.abs(point[0]);
        const y = Math.abs(point[1]);

        if (this.grid[x][y] !== 1) {

          this.grid[x][y] = color;
          //current_ray.push(point)
        }
      });

      this.listRay.push(line);
    });

  }

  private recurse(search, arr: number[][]) {

    arr.forEach((line, x) => {
      line.forEach((col, y) => {
        if (col === search) {
          return [x, y];
        }
      });
    });

    return false;
  }

  /**
   * Virtually draw a line from (x1, y1) to (x2, y2) using Bresenham algorithm, returning the coordinates of the points that would belong to the line.
   * @param $x1 (Int)
   * @param $y1 (Int)
   * @param $x2 (Int)
   * @param $y2 (Int)
   * @return (Array of couples forming the line) Eg: array(array(2,100), array(3, 101), array(4, 102), array(5, 103))
   * Public domain Av'tW
   */
  private bresenham(x1, y1, x2, y2, guaranteeEndPoint = true) {
    const xBegin = x1;
    const yBegin = y1;
    const xEnd = x2;
    const yEnd = y2;

    const dots = []; // Array of couples, returned array
    const steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    // Swap some coordinateds in order to generalize
    if (steep) {
      let tmp = x1;
      x1 = y1;
      y1 = tmp;
      tmp = x2;
      x2 = y2;
      y2 = tmp;
    }

    if (x1 > x2) {
      let tmp = x1;
      x1 = x2;
      x2 = tmp;
      tmp = y1;
      y1 = y2;
      y2 = tmp;
    }

    const deltax = Math.floor(x2 - x1);
    const deltay = Math.floor(Math.abs(y2 - y1));
    let error = 0;
    const deltaerr = deltay / deltax;
    let y = y1;
    let x;
    const ystep = (y1 > y2) ? 1 : -1;
    for (x = x1; x < x2; x++) {
      dots.push(steep ? [y, x] : [x, y]);
      error += deltaerr;
      if (error >= 0.5) {
        y += ystep;
        error -= 1;
      }
    }

    if (guaranteeEndPoint) {
      // Bresenham doesn't always include the specified end point in the result line, add it now.
      if (((xEnd - x) * (xEnd - x) + (yEnd - y) * (yEnd - y)) <
        ((xBegin - x) * (xBegin - x) + (yBegin - y) * (yBegin - y))) {
        // Then we're closer to the end
        dots.push([xEnd, yEnd]);
      } else {
        dots.push([xBegin, yBegin]);
      }
    }

    return dots;
  }
}

const generatePOV = (size: number) => {
  const middle = Math.floor(size / 2);
  const pov = new POV(middle + 1);
  pov.run();
  const baseRays = pov.getListRayon;

  const relativeRays = {};

  baseRays.forEach(ray => {
    const relativeRay1 = [];
    const relativeRay2 = [];
    const relativeRay3 = [];
    const relativeRay4 = [];
    ray.forEach(point => {
      const [x, y] = point;

      const offsetN = middle - x;
      const offsetO = middle - y;
      const offsetS = x + middle;
      const offsetW = y + middle;

      relativeRay1.push([offsetN, offsetO]);
      relativeRay2.push([offsetN, offsetW]);
      relativeRay3.push([offsetS, offsetW]);
      relativeRay4.push([offsetS, offsetO]);

    });

    relativeRays[JSON.stringify(relativeRay1)] = relativeRay1;
    relativeRays[JSON.stringify(relativeRay2)] = relativeRay2;
    relativeRays[JSON.stringify(relativeRay3)] = relativeRay3;
    relativeRays[JSON.stringify(relativeRay4)] = relativeRay4;

  });


  return Object.values(relativeRays);
}

module.exports = {
  POV,
  generatePOV
}