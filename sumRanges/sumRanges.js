//
// This is only a SKELETON file for the 'Minesweeper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const sum = (arr) => {
  return arr.reduce( (acc, curr) => acc+curr, 0);
};


export const range = (start, end, step) => {

  const sumArr = [];

  //step default
  if(start > end){
    if(typeof step == 'undefined')
      step = -1;

    for(let i=start; i >= end; i+=step){
      sumArr.push(i);
    }
  }
  if(start < end){
    if(typeof step == 'undefined')
      step = 1;
      
    for(let i=start; i <= end; i+=step){
      sumArr.push(i);
    }
  }
  
  return sumArr;
};