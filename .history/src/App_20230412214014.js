import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

//前後左右を逆にする
const initial = defaultSeating.reverse().map((arr) => arr.reverse());

function App() {
  const [list, setList] = useState(initial);
  console.log("list", list);

  const slide = (e) => {
    const index = e.currentTarget.getAttribute("index");
    const listClone = structuredClone(list);
    const data = listClone[index];
    const positiveData = data.filter((item) => item > 0);
    const rotatedData = [...data];
    let rotatedPositive = [];
    console.log("positiveData", positiveData);

    if (e.currentTarget.classList.contains("slideDown") === true) {
      let temp = positiveData.pop();
      rotatedPositive = [temp, ...positiveData];
      console.log("rotatedPositive", rotatedPositive);
    } else if (e.currentTarget.classList.contains("slideDown") === true) {
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
    setList(listClone);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h3>Seating App</h3>
      <div id='main'>
        <div className='panelCorner1'></div>
        <div className='panelUpper'>
          {Array.from(Array(10).keys()).map((i) => (
            <div className='panel' key={i}>
              <FontAwesomeIcon icon={faGrip} className='iconSpaceTB' />
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
              <FontAwesomeIcon icon={faCaretLeft} className='slideLeft' />
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
              <FontAwesomeIcon icon={faCaretRight} className='slideRight' />
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
