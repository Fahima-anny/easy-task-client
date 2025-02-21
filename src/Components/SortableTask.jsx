/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const SortableTask = ({ task, handleDelete, handleEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

  return (
    <div
      ref={setNodeRef}
    //   style={style}
      {...attributes}
      {...listeners}
      className="border rounded-xl p-2 flex gap-2 justify-between cursor-grab active:cursor-grabbing"
    >
      {/* আপনার টাস্ক UI এখানে */}
      <div>
        <p className="font-bold text-accent text-xl">{task.title}</p>
        <p className="text-gray-500">{task.description}</p>
      </div>
      <div className="text-xl flex flex-col">
        <BiSolidEdit onClick={() => handleEdit(task)} className="mt-2 cursor-pointer" />
        <RiDeleteBin6Line onClick={() => handleDelete(task)} className="mt-3 text-red-600 cursor-pointer" />
      </div>
    </div>
  );
};