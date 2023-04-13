const data = [0, 1, 2, 3, 4, 5, 6, 0, 0, 0];
export const slide = (e) => {
  const index = e.currentTarget.getAttribute("index");

  console.log(data.filter((item) => item > 0));

  //   slideUp,slideDown,slideLeft,slideRight

  if (e.currentTarget.classList.contains("slideUp") == true) {
    console.log("index");
  }

  return;
};
