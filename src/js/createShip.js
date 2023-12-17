function createShip(length) {
  let hits = 0;

  return {
    getLength() {
      return length;
    },
    hit() {
      if (this.isSunk()) {
        return false;
      } else {
        hits++;
        return true;
      }
    },
    isSunk() {
      return hits >= length;
    },
  };
}

export default createShip;
