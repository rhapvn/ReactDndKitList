import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { data } from "../data/data.jsx";
import { useEffect, useState } from "react";

export function SortableItem({ index, id, moveData }) {
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
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener("mouseup", handleEnd);

    return () => {
      window.removeEventListener("mouseup", handleEnd);
    };
  }, []);

  return (
    <div
      onDragStart={(e) => handleStart(e, "test")}
      onDragEnd={handleEnd}
      className='desk'
      style={style}
      id={"id" + index}
      draggable='true'
    >
      <div className='m3'>{data[parseInt(index)].name}</div>
    </div>
  );
}
