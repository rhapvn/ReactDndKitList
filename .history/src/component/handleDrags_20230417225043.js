export const handleDragEnd = (event, props) => {
  // console.log("Drag end called");
  console.log(event);
  console.log(props);
  const { active, over } = event;
  // console.log("ACTIVE: " + active.id);
  // console.log("OVER :" + over.id);
  const { setList } = props;

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

export const handleStart = (
  e,
  { initial, setInitial, setMoveData, setIsDragging }
) => {
  e.preventDefault();
  setInitial({ x: e.clientX, y: e.clientY });
  if(["panelUpper", "panelLower", "panelLeft", "panelRight"].includes(e.currentTarget.parentElement.parentElement.className )) {
  setMoveData({
    place: e.currentTarget.parentElement.parentElement.className,
    id: e.currentTarget.getAttribute("index"),
    x: 0,
    y: 0,
  });
  console.log("start");
  console.log(e);
  console.log(e.clientX, e.clientY);
  console.log(
    e.currentTarget.parentElement.parentElement.className,
    e.currentTarget.getAttribute("index"),
    initial.x,
    initial.y
  );
  setIsDragging(true);
};

export const handleMouseMove = (
  e,
  { initial, isDragging, moveData, setMoveData }
) => {
  if (!isDragging) return;
  e.preventDefault();
  setMoveData((prev) => ({
    place: prev.place,
    id: prev.id,
    x: e.clientX - initial.x,
    y: e.clientY - initial.y,
  }));
  console.log("dragging");
  console.log(
    "place",
    moveData.place,
    "id",
    moveData.id,
    e.clientX - initial.x,
    e.clientY - initial.y
  );
};

export const handleEnd = ({ setIsDragging }) => {
  console.log("end");
  setIsDragging(false);
};
