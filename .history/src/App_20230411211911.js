import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortableItem";
import { data } from "./data.jsx";
import { defaultSeating } from "./seating.jsx";

function App() {
  const [list, setList] = useState(defaultSeating);
  console.log(
    list
      .map((arrayI, i) =>
        arrayI.map((indexJ, j) => i.toString() + "-" + j.toString())
      )
      .flat()
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h3>Seating App</h3>
      <Container
        className='whole-seating'
        style={{ width: "90%" }}
        align='center'
      >
        <SortableContext
          className='container'
          items={list
            .map((arrayI, i) => arrayI.map((indexJ, j) => indexJ))
            .flat()}
          strategy={rectSwappingStrategy}
        >
          {/* We need components that use the useSortable hook */}
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
                  <div className='m-3'> </div>
                </div>
              );
            })
          )}
        </SortableContext>
      </Container>
    </DndContext>
  );

  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

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
        console.log("mae", temp);
        return temp;
      });
    }
  }
}

export default App;
