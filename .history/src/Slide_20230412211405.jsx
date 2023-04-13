const data = [0, 1, 2, 3, 4, 5, 6, 0, 0, 0];
export const slide = (e) => {
  const index = e.currentTarget.getAttribute("index");
  const positiveData = data.filter((item) => item > 0);
  console.log(index, positiveData);
  const rotatedData = [...data];
  //   slideUp,slideDown,slideLeft,slideRight

  if (e.currentTarget.classList.contains("slideUp") == true) {
    let temp = positiveData.pop();
    const rotatedPositive = [temp, ...positiveData];
    console.log(rotatedPositive);

    const count = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i] > 0) {
        rotatedData[i] = rotatedPositive[count];
        count++;
      } else {
        rotatedData[i] = 0;
      }
    }
    console.log(rotatedData);
  }

  return;
};
