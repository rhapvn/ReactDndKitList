import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  // arrayMove,
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./component/SortableItem";
import { defaultSeating } from "./data/seating.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faGrip,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { Slide } from "./component/Panel4";
import { shuffle } from "./component/shuffle";

//前後左右を逆にする
const initial = defaultSeating.reverse().map((arr) => arr.reverse());

function App() {
  const [list, setList] = useState(initial);
  console.log("list", list);

  // console.log(document.getElementById("id23").getBoundingClientRect()); //実験中
  // console.log(document.getElementById("id23").children[0].innerHTML);
  // console.log(document.getElementById("id24").getBoundingClientRect());
  // console.log(document.getElementById("id24").children[0].innerHTML);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h1>Seating App</h1>
      <div id='mainField'>
        <div className='panelCorner1'></div>
        <Slide setList={setList} list={list} direction='Upper' />
        <div className='panelCorner2'></div>
        <Slide setList={setList} list={list} direction='Left' />

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

        <Slide setList={setList} list={list} direction='Right' />

        <div className='panelCorner3'></div>
        <Slide setList={setList} list={list} direction='Down' />

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
