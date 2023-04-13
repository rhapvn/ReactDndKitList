import { defaultSeating } from "./seating";

//   slideUp,slideDown,slideLeft,slideRight
export const slide = (e) => {
  const index = e.currentTarget.getAttribute("index");
  const data = defaultSeating[index];
  const positiveData = data.filter((item) => item > 0);
  const rotatedData = [...data];

  if (e.currentTarget.classList.contains("slideUp") === true) {
    let temp = positiveData.pop();
    const rotatedPositive = [temp, ...positiveData];

    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] > 0) {
        rotatedData[i] = rotatedPositive[count];
        count++;
      } else {
        rotatedData[i] = 0;
      }
    }
  }
  defaultSeating[index] = rotatedData;
  console.log("defaultSeating", defaultSeating);
  return rotatedData;
};
