/* eslint-disable react/prop-types */
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const TaskColumn = ({ title, tasks, droppableId }) => {
    return (
      <div className="border border-gray-500 rounded-2xl p-3 space-y-3 min-h-[50vh] bg-base-100">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <div className="divider"></div>
        
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="border rounded-xl p-2 flex gap-2 justify-between bg-white shadow"
                    >
                      <div>
                        <p className="font-bold text-accent text-xl">{task.title}</p>
                        <p className="text-gray-500">{task.description}</p>
                      </div>
                      <div className="text-xl flex flex-col">
                        <BiSolidEdit className="mt-2 cursor-pointer" />
                        <RiDeleteBin6Line className="mt-3 text-red-600 cursor-pointer" />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };