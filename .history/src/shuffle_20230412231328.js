export const shuffle = (list, index, classes) => {
  const up = classes.contains("slideUp") ? true : false;
  const down = classes.contains("slideDown") ? true : false;
  const left = classes.contains("slideLeft") ? true : false;
  const right = classes.contains("slideRight") ? true : false;

  let listClone = structuredClone(list);
  const data =
    up || down ? listClone[index] : listClone.map((arr) => arr[index]);
  const positiveData = data.filter((item) => item > 0);
  const rotatedData = [...data];
  let rotatedPositive = [];
  console.log("positiveData", positiveData);
  console.log(classes.contains("slideUp"));

  if (down || right) {
    let temp = positiveData.pop();
    rotatedPositive = [temp, ...positiveData];
    console.log("rotatedPositive", rotatedPositive);
  } else if (up || left) {
    let temp = positiveData.shift();
    rotatedPositive = [...positiveData, temp];
    console.log("rotatedPositive", rotatedPositive);
  }

  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0) {
      rotatedData[i] = rotatedPositive[count];
      count++;
    } else {
      rotatedData[i] = 0;
    }
  }
  listClone[index] = rotatedData;
  console.log("listClone", listClone);

  //   const listClone =
  //     classes.contains("slideDown") || classes.contains("slideUp")
  //       ? shuffleUpDown(list, index, classes)
  //       : shuffleLeftRight(list, index, classes);
  return listClone;
};

const shuffleUpDown = (list, index, classes) => {
  let listClone = structuredClone(list);
  const data = listClone[index];
  const positiveData = data.filter((item) => item > 0);
  const rotatedData = [...data];
  let rotatedPositive = [];
  console.log("positiveData", positiveData);
  console.log(classes.contains("slideUp"));

  if (
    classes.contains("slideDown") === true ||
    classes.contains("slideRight") === true
  ) {
    let temp = positiveData.pop();
    rotatedPositive = [temp, ...positiveData];
    console.log("rotatedPositive", rotatedPositive);
  } else if (
    classes.contains("slideUp") === true ||
    classes.contains("slideLeft") === true
  ) {
    let temp = positiveData.shift();
    rotatedPositive = [...positiveData, temp];
    console.log("rotatedPositive", rotatedPositive);
  }

  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0) {
      rotatedData[i] = rotatedPositive[count];
      count++;
    } else {
      rotatedData[i] = 0;
    }
  }
  listClone[index] = rotatedData;
  console.log("listClone", listClone);

  return listClone;
};

const shuffleLeftRight = (list, index, classes) => {
  let listClone = structuredClone(list);

  //ここから
  const data = listClone.map((arr) => arr[index]);
  const positiveData = data.filter((item) => item > 0);
  const rotatedData = [...data];
  let rotatedPositive = [];
  console.log("positiveData", positiveData);

  console.log(classes.contains("slideRight"));

  if (classes.contains("slideRight") === true) {
    let temp = positiveData.pop();
    rotatedPositive = [temp, ...positiveData];
    console.log("rotatedPositive", rotatedPositive);
  } else if (classes.contains("slideLeft") === true) {
    let temp = positiveData.shift();
    rotatedPositive = [...positiveData, temp];
    console.log("rotatedPositive", rotatedPositive);
  }

  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0) {
      rotatedData[i] = rotatedPositive[count];
      count++;
    } else {
      rotatedData[i] = 0;
    }
  }
  listClone = listClone.map((arr, i) => {
    arr[index] = rotatedData[i];
    return arr;
  });

  console.log("listClone", listClone);

  return listClone;
};
