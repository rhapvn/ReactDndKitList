import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { data } from "../data/data.jsx";

export function SortableItem(props) {
  // props.id
  // JavaScript

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.index,
      transition: {
        duration: 150,
        easing: "cubic - bezier(0.25, 0.1, 0.25, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className='desk'
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      id={"id" + props.index}
    >
      <div className='m3'>{data[parseInt(props.index)].name}</div>
    </div>
  );
}
