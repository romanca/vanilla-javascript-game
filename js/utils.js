export function isCollision(elemA, elemB) {
  const A = {
    x1: elemA.position.left - elemA.dimensions.width,
    x2: elemA.position.left + elemA.dimensions.width,
    y1: elemA.position.top + elemA.dimensions.height,
    y2: elemA.position.top - elemA.dimensions.height,
  };
  const B = {
    x1: elemB.position.left - elemB.aggro.width,
    x2: elemB.position.left + elemB.aggro.width,
    y1: elemB.position.top + elemB.aggro.height,
    y2: elemB.position.top - elemB.aggro.height,
  };
  if (A.x1 <= B.x2 && A.x2 >= B.x1 && A.y1 >= B.y2 && A.y2 <= B.y1) {
    return true;
  }
  return false;
}
