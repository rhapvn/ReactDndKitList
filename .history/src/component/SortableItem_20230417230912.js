import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { data } from "../data/data.jsx";
import { useEffect, useState } from "react";
import { handleStart, handleMouseMove, handleEnd } from "./handleDrags";

export function SortableItem({ index, id, moveData, setMoveData }) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [isDeskDragging, setIsDeskDragging] = useState(false);

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
    window.addEventListener("mousemove", moveDesk);
    return () => {
      window.removeEventListener("mousemove", moveDesk);
    };
  }, [isDeskDragging]);

  useEffect(() => {
    window.addEventListener("mouseup", () => handleEnd({ setIsDeskDragging }));

    return () => {
      window.removeEventListener("mouseup", () =>
        handleEnd({ setIsDeskDragging })
      );
    };
  }, []);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currenttarget.style.background = "#f4f4f4";
  };

  const start = (e) => {
    handleStart(e, { initial, setInitial, setMoveData, setIsDeskDragging });
  };
  const moveDesk = (e) => {
    handleMouseMove(e, { initial, isDeskDragging, moveData, setMoveData });
  };

  return (
    <div
      onDragStart={start}
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
