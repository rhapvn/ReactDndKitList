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
import { Slide } from "./component/Panel4";
import { handleDragEnd } from "./component/handleDragEnd";

//前後左右を逆にする
const initial = defaultSeating.reverse().map((arr) => arr.reverse());

function App() {
  const [list, setList] = useState(initial);
  console.log("list", list);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      setList={setList}
    >
      <h1>Seating App</h1>
      <div id='mainField' className='max-h-full'>
        {/* Upper and Left panel */}
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

        {/* Right and Down panel */}
        <Slide setList={setList} list={list} direction='Right' />
        <div className='panelCorner3'></div>
        <Slide setList={setList} list={list} direction='Down' />
        <div className='panelCorner4'></div>
      </div>
    </DndContext>
  );
}

export default App;
