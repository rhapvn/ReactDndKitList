export const shuffle = (list, index, classes) => {
  return listClone;
};

const shuffleUpDown = (list, index, classes) => {
  const listClone = structuredClone(list);
  const data = listClone[index];
  const positiveData = data.filter((item) => item > 0);
  const rotatedData = [...data];
  let rotatedPositive = [];
  console.log("positiveData", positiveData);
  console.log(classes.contains("slideUp"));

  if (classes.contains("slideDown") === true) {
    let temp = positiveData.pop();
    rotatedPositive = [temp, ...positiveData];
    console.log("rotatedPositive", rotatedPositive);
  } else if (classes.contains("slideUp") === true) {
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
