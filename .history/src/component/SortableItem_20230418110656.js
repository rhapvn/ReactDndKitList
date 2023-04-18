import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { data } from "../data/data.jsx";
import { useEffect, useState } from "react";
import { handleStart, handleMouseMove, handleEnd } from "./handleDrags";

export function SortableItem({ index, id, moveData, setMoveData }) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", () => handleEnd({ setIsDragging }));

    return () => {
      window.removeEventListener("mouseup", () => handleEnd({ setIsDragging }));
    };
  }, []);

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("over");
    console.log(e.currentTarget);
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("enter");
    console.log(e.currentTarget);
    e.currentTarget.className = "desk over";
  };

  const handleDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("leave");
    console.log(e.currentTarget);
    e.currentTarget.className = "desk";
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

  return (
    <div
      onDragStart={start}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrag={handleDrag}
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
