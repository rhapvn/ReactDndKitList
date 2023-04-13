const data = [0, 1, 2, 3, 4, 5, 6, 0, 0, 0];
export const slide = (e) => {
  const index = e.currentTarget.getAttribute("index");
  const array = data.filter((item) => item > 0);
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
