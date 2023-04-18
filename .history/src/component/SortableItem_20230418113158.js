import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { data } from "../data/data.jsx";
import { useEffect, useState } from "react";
import { handleStart, handleMouseMove, handleEnd } from "./handleDrags";

export function SortableItem({ index, id, moveData, setMoveData }) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [counter, setCounter] = useState(0);

  const { transform, transition } = useSortable({
    id: index,
    transition: {
      duration: 150,
      easing: "cubic - bezier(0.25, 0.1, 0.25, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    document.getElementById("whole-seating").addEventListener("mousemove", move);
    return () => {
      document.getElementById("whole-seating").removeEventListener.("mousemove", move);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", (e) => handleEnd(e, { setIsDragging }));

    return () => {
      window.removeEventListener("mouseup", (e) =>
        handleEnd(e, { setIsDragging })
      );
    };
  }, []);
  useEffect(() => {

    window.addEventListener("mouseup", (e) => handleEnd(e, { setIsDragging }));

    return () => {
      window.removeEventListener("mouseup", (e) =>
        handleEnd(e, { setIsDragging })
      );
    };
  }, []);

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("over");
    console.log(e.currentTarget);
    e.currentTarget.classList.add("over");
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("enter");
    console.log(e.currentTarget);
  };

  const handleDragLeave = (e) => {
    setCounter((prev) => prev - 1);
    e.preventDefault();
    console.log("leave");
    console.log(e.currentTarget);
    e.currentTarget.classList.remove("over");
  };

  const handleDrag = (e) => {
    // console.log("drag");
    // console.log(e.currentTarget);
  };

  const start = (e) => {
    handleStart(e, { initial, setInitial, setMoveData, setIsDragging });
  };
  const move = (e) => {
    handleMouseMove(e, { initial, isDragging, moveData, setMoveData });
  };
  const handleDrop = (e) => {
    e.preventDefault();

    console.log("drop");
    console.log(e.currentTarget);
    e.currentTarget.classList.remove("over");
  };


  return (
    <div
      onDragStart={start}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className='desk'
      id={id}
      index={index}
      draggable='true'
      style={
        moveData.id == id
          ? {
              transform: `translate(${moveData.x}px, ${moveData.y}px)`,
            }
          : {}
      }
    >
      <div className='m3'>{data[parseInt(index)].name}</div>
    </div>
  );
}
