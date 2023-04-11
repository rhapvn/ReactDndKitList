import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { data } from "./data.jsx";

export function SortableItem(props) {
  // props.id
  // JavaScript

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id + "hehe" });

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
    >
      <div body className='m-3'>
        {data[parseInt(props.index)].name}
      </div>
    </div>
  );
}
