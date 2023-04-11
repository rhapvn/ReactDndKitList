import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  // props.id
  // JavaScript

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div body className='m-3 card'>
        {props.id}
      </div>
    </div>
  );
}
