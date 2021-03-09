const directions = [
  {
    x: 0,
    y: 1
  },
  {
    x: 1,
    y: 0
  },
  {
    x: 0,
    y: -1
  },
  {
    x: -1,
    y: 0
  }
];

export function makeMove(position, x, y) {
  for (let i = 0; i < directions.length; i++) {
    const d = directions[i];

    const nX = x + d.x;
    const nY = y + d.y;
    const nCoord = 3 * nX + nY;

    if (nX >= 0 && nX < 3 && nY >= 0 && nY < 3 && position[nCoord] === " ") {
      const coord = 3 * x + y;
      const tmp = position.split("");

      tmp[nCoord] = tmp[coord];
      tmp[coord] = " ";

      return tmp.join("");
    }
  }

  return position;
}

export function getDerivatives(queueItem) {
  let result = [];

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const nextPosition = makeMove(queueItem.position, x, y);

      if (nextPosition !== queueItem.position) {
        result = [
          ...result,
          {
            moves: [...queueItem.moves, queueItem.position[3 * x + y]],
            position: nextPosition
          }
        ];
      }
    }
  }

  return result;
}

export function sleep(time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
    console.log(reject);
  });
}
