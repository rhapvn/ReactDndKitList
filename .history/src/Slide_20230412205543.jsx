const data = [0, 35, 36, 37, 38, 39, 40, 0, 0, 0];
export const slide = (e) => {
  const index = e.currentTarget.getAttribute("index");
  const array = data.map((x, i) => [x, i]).filter((arr) => arr[0] > 0);
  console.log(index, array);

  //   slideUp,slideDown,slideLeft,slideRight

  if (e.currentTarget.classList.contains("slideUp") == true) {
    let temp = array.pop();
    console.log(temp);
    let newArray = [temp, ...array];
    console.log(newArray);
  }

  return;
};
