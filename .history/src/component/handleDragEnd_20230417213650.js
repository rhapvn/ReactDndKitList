export const handleDragEnd = (event, { setList }) => {
  // console.log("Drag end called");
  const { active, over } = event;
  // console.log("ACTIVE: " + active.id);
  // console.log("OVER :" + over.id);

  if (active.id !== over.id) {
    setList((prev) => {
      const temp = Array.from(prev);

      //find active.id from temp and swap with over.id
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          if (temp[i][j] === active.id) {
            temp[i][j] = over.id;
          } else if (temp[i][j] === over.id) {
            temp[i][j] = active.id;
          }
        }
      }
      // console.log("mae", temp);
      return temp;
    });
  }
};
