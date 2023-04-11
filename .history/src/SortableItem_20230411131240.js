import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "react-bootstrap/Card";

export function SortableItem(props) {
  // props.id
  // JavaScript
  console.log(props.id, props.student);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card body className='m-3'>
        {props.student.number} {props.student.name}
      </Card>
    </div>
  );
}
