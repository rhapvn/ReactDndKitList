const data = [0, 1, 2, 3, 4, 5, 6, 0, 0, 0];
export const slide = (e) => {
  console.log(e);
  console.log(e.currentTarget.classList);
  console.log(e.currentTarget.index);

  console.log(data.filter((item) => item > 0));

  // if (element.classList.contains("red") == true) {

  // }

  return;
};
