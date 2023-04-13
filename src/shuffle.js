export const shuffle = (list, index, classes) => {
  const up = classes.contains("slideUp") ? true : false;
  const down = classes.contains("slideDown") ? true : false;
  const left = classes.contains("slideLeft") ? true : false;
  const right = classes.contains("slideRight") ? true : false;

  //並べ替える1列を取り出し
  let listClone = structuredClone(list);
  const data =
    up || down ? listClone[index] : listClone.map((arr) => arr[index]);
  const positiveData = data.filter((item) => item > 0);
  const rotatedData = [...data];
  let rotatedPositive = [];

  //ひとつずつずらす
  if (down || right) {
    let temp = positiveData.pop();
    rotatedPositive = [temp, ...positiveData];
  } else if (up || left) {
    let temp = positiveData.shift();
    rotatedPositive = [...positiveData, temp];
  }

  //並べ替えたものを元の配列に戻す
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0) {
      rotatedData[i] = rotatedPositive[count];
      count++;
    } else {
      rotatedData[i] = 0;
    }
  }

  //一番はじめの配列に戻す
  if (up || down) {
    listClone[index] = rotatedData;
  } else if (left || right) {
    listClone = listClone.map((arr, i) => {
      arr[index] = rotatedData[i];
      return arr;
    });
  }
  console.log("listClone", listClone);
  return listClone;
};
