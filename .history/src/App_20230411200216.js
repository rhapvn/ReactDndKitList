import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
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
  console.log(list);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container className='p-3' style={{ width: "50%" }} align='center'>
        <h3>Seating App</h3>
        <SortableContext
          className='container'
          items={list.map(
            (_, i) => (_, j) => i.toString() + "-" + j.toString()
          )}
          strategy={rectSwappingStrategy}
        >
          {/* We need components that use the useSortable hook */}
          {list.map((arrayI, i) =>(arrayI.map(indexJ, j) =>{ 
            return (indexJ > 0 ? (
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
              </div>)
            );}
          ))}
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
        temp[active.id] = prev[over.id];
        temp[over.id] = prev[active.id];
        console.log(temp);
        return temp;
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1]
      });
    }
  }
}

export default App;
