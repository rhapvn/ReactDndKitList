import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  // arrayMove,
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./component/SortableItem";
import { defaultSeating } from "./data/seating.jsx";
import { Slide } from "./component/Panel4";

//前後左右を逆にする
const initial = defaultSeating.reverse().map((arr) => arr.reverse());

function App() {
  const [list, setList] = useState(initial);
  const [moveData, setMoveData] = useState({ place: "", id: "", x: 0, y: 0 });
  console.log("list", list);

  return (
    <>
      <h1>Seating App</h1>
      <div id='mainField' className='max-h-full'>
        {/* Upper and Left panel */}
        <div className='panelCorner1'></div>
        <Slide
          setList={setList}
          list={list}
          direction='Upper'
          moveData={moveData}
          setMoveData={setMoveData}
        />
        <div className='panelCorner2'></div>
        <Slide
          setList={setList}
          list={list}
          direction='Left'
          moveData={moveData}
          setMoveData={setMoveData}
        />

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
                    moveData={moveData}
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

        {/* Right and Down panel */}
        <Slide
          setList={setList}
          list={list}
          direction='Right'
          moveData={moveData}
          setMoveData={setMoveData}
        />
        <div className='panelCorner3'></div>
        <Slide
          setList={setList}
          list={list}
          direction='Down'
          moveData={moveData}
          setMoveData={setMoveData}
        />
        <div className='panelCorner4'></div>
      </div>
    </>
  );
}

export default App;
