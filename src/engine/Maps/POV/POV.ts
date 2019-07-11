export interface POVPoint {
  x: number;
  y: number;
}

export type POVRay = POVPoint[];

export class POV {

  private get getListRayon() {
    return this.listRay.map(r => r.map(p => ({
      x: Math.abs(p.x),
      y: Math.abs(p.y),
    })));
  }

  public static generatePOV(size: number) {
    const middle = Math.floor(size / 2);
    const pov = new POV(middle + 1);
    pov.run();
    const baseRays = pov.getListRayon;

    const relativeRays = {};

    baseRays.forEach(ray => {
      const relativeRay1: POVRay = [];
      const relativeRay2: POVRay = [];
      const relativeRay3: POVRay = [];
      const relativeRay4: POVRay = [];
      ray.forEach(point => {
        const { x, y } = point;

        const offsetN = middle - x;
        const offsetO = middle - y;
        const offsetS = x + middle;
        const offsetW = y + middle;

        relativeRay1.push({ x: offsetN, y: offsetO });
        relativeRay2.push({ x: offsetN, y: offsetW });
        relativeRay3.push({ x: offsetS, y: offsetW });
        relativeRay4.push({ x: offsetS, y: offsetO });

      });

      relativeRays[JSON.stringify(relativeRay1)] = relativeRay1;
      relativeRays[JSON.stringify(relativeRay2)] = relativeRay2;
      relativeRays[JSON.stringify(relativeRay3)] = relativeRay3;
      relativeRays[JSON.stringify(relativeRay4)] = relativeRay4;

    });

    return Object.values(relativeRays);
  }

  private grid: boolean[][];
  private size: number;
  private listRay: POVRay[];

  private constructor(size: number) {
    this.size = size;

    this.grid = [];

    for (let line = 0; line < this.size; line += 1) {
      const arr = [];
      for (let column = 0; column < this.size; column += 1) {
        arr.push(false);
      }
      this.grid.push(arr);
    }
  }

  private run() {
    const cases: POVRay = [];

    for (let i = 0; i < this.size; i += 1) {
      cases.push({ x: i, y: this.size - 1 });
      cases.push({ x: this.size - 1, y: i });
    }
    this.listRay = [];

    this.generateRay(cases);

    let recurse = true;
    do {
      const testCase = this.recurse(false, this.grid);

      if (testCase === false) {
        recurse = false;
      } else {
        this.generateRay([testCase]);
      }
    } while (recurse);
  }

  private generateRay(cases: POVRay) {

    cases.forEach(ray => {
      const position_x = ray.x;
      const position_y = ray.y;
      const line = this.bresenham(0, 0, position_x, position_y, false);

      line.push({ x: position_x, y: position_y });

      line.forEach(point => {
        const x = Math.abs(point.x);
        const y = Math.abs(point.y);

        if (!this.grid[x][y]) {

          this.grid[x][y] = true;
        }
      });

      this.listRay.push(line);
    });

  }

  private recurse(search: any, arr: any[][]): POVPoint | false {

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
  private bresenham(x1: number, y1: number, x2: number, y2: number, guaranteeEndPoint = true): POVRay {
    const xBegin = x1;
    const yBegin = y1;
    const xEnd = x2;
    const yEnd = y2;

    const dots: POVPoint[] = []; // Array of couples, returned array
    const steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    // Swap some coordinateds in order to generalize
    // tslint:disable: no-parameter-reassignment
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
    // tslint:enable: no-parameter-reassignment

    const deltax = Math.floor(x2 - x1);
    const deltay = Math.floor(Math.abs(y2 - y1));
    let error = 0;
    const deltaerr = deltay / deltax;
    let y = y1;
    let x;
    const ystep = (y1 > y2) ? 1 : -1;
    for (x = x1; x < x2; x += 1) {
      dots.push(steep ? { x: y, y: x } : { x, y });
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
        dots.push({ x: xEnd, y: yEnd });
      } else {
        dots.push({ x: xBegin, y: yBegin });
      }
    }

    return dots;
  }
}
