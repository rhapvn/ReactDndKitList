import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  // arrayMove,
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortableItem";
import { defaultSeating } from "./seating.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faGrip,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { shuffle } from "./shuffle";

//前後左右を逆にする
const initial = defaultSeating.reverse().map((arr) => arr.reverse());

function App() {
  const [list, setList] = useState(initial);
  console.log("list", list);

  const slide = (e) => {
    const index = e.currentTarget.getAttribute("index");
    const classes = e.currentTarget.classList;
    const listClone = shuffle(list, index, classes);
    setList(listClone);
  };

  const moveColumn = (e) => {
    const index = e.currentTarget.getAttribute("index");
    const classes = e.currentTarget.classList;
    console.log("index", index);
    console.log("classes", classes);

    // console.log(document.getElementById("id23").getBoundingClientRect()); //実験中
    // console.log(document.getElementById("id23").children[0].innerHTML);
    // console.log(document.getElementById("id24").getBoundingClientRect());
    // console.log(document.getElementById("id24").children[0].innerHTML);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h1>Seating App</h1>
      <div id='main'>
        <div className='panelCorner1'></div>
        <div className='panelUpper'>
          {Array.from(Array(10).keys()).map((i) => (
            <div
              className='p-0 m-0 panel flex justify-center items-center'
              key={i}
            >
              <div
                onDragStart={moveColumn}
                index={i}
                draggable='true'
                className='absolute top-0 left-0 w-full h-full cursor-move'
              >
                <FontAwesomeIcon icon={faGrip} className='iconSpaceTB' />
              </div>
              <FontAwesomeIcon
                onClick={slide}
                icon={faCaretUp}
                className='slideUp'
                index={i}
              />
            </div>
          ))}
        </div>
        <div className='panelCorner2'></div>

        <div className='panelLeft'>
          {Array.from(Array(10).keys()).map((i) => (
            <div className='panel' key={i}>
              <FontAwesomeIcon icon={faGripVertical} className='iconSpaceLR' />
              <FontAwesomeIcon
                icon={faCaretLeft}
                className='slideLeft'
                index={i}
                onClick={slide}
              />
            </div>
          ))}
        </div>

        {/* main desk part */}
        <div className='whole-seating' style={{}} align='center'>
          <SortableContext
            className='container'
            items={list
              .map((arrayI, i) => arrayI.map((indexJ, j) => indexJ))
              .flat()}
            strategy={rectSwappingStrategy}
          >
            {list.map((arrayI, i) =>
              arrayI.map((indexJ, j) => {
                return indexJ > 0 ? (
                  <SortableItem
                    key={i.toString() + "-" + j.toString()}
                    id={i.toString() + "-" + j.toString()}
                    index={indexJ}
                  />
                ) : (
                  <div
                    className='desk  empty'
                    key={i.toString() + "-" + j.toString()}
                  >
                    <div className='m3'> </div>
                  </div>
                );
              })
            )}
          </SortableContext>
        </div>
        <div className='panelRight'>
          {Array.from(Array(10).keys()).map((i) => (
            <div className='panel' key={i}>
              <FontAwesomeIcon
                icon={faCaretRight}
                className='slideRight'
                index={i}
                onClick={slide}
              />
              <FontAwesomeIcon icon={faGripVertical} className='iconSpaceLR' />
            </div>
          ))}
        </div>
        <div className='panelCorner3'></div>
        <div className='panelLower'>
          {Array.from(Array(10).keys()).map((i) => (
            <div className='panel' key={i}>
              <FontAwesomeIcon
                icon={faCaretDown}
                className='slideDown'
                index={i}
                onClick={slide}
              />
              <FontAwesomeIcon icon={faGrip} className='iconSpaceTB' />
            </div>
          ))}
        </div>
        <div className='panelCorner4'></div>
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
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
  }
}

export default App;
