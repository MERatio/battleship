import createShip from "./createShip";

export function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateShips() {
  return [
    createShip(5),
    createShip(4),
    createShip(3),
    createShip(3),
    createShip(2),
  ];
}
