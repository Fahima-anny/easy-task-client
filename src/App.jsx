/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { AuthContext } from "./Components/Navbar/Authentications/AuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "./Components/Navbar/Authentications/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "react-toastify";
import AddTaskModal from "./Components/Modals/AddTaskModal";
import EditTaskModal from "./Components/Modals/EditTaskModal";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

  useEffect(() => {
    AOS.init({
        duration: 2000,
        once: true,
        offset: 200
    });
}, []);

  const { user } = useContext(AuthContext);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const axiosPublic = useAxiosPublic();
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editTaskModal, setEditTaskModal] = useState(false);



  const { data, isPending: allTasksPending, refetch } = useQuery({
    queryKey: [user.email, 'allTasks'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?email=${user.email}`);
      // console.log(res?.data);

      const todoTasks = res.data.filter(task => task.category === 'todo')
      setTodo(todoTasks);
      // console.log(todoTasks);

      const inProgressTasks = res.data.filter(task => task.category === 'inProgress')
      setInProgress(inProgressTasks);

      const doneTasks = res.data.filter(task => task.category === 'done')
      setDone(doneTasks);
      return res?.data
    },
    enabled: !!user?.email
  })



  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If the task is moved to the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const lists = { todo, inProgress, done };
    const [movedTask] = lists[source.droppableId].splice(source.index, 1);
    movedTask.category = destination.droppableId;
    movedTask.position = destination.index; // Update the position

    lists[destination.droppableId].splice(destination.index, 0, movedTask);

    // Reassign positions for all tasks in the destination list
    const updatedTasks = lists[destination.droppableId].map((task, index) => {
      task.position = index; // Set position based on the new index
      return task;
    });

    // Update the local state
    setTodo(lists.todo);
    setInProgress(lists.inProgress);
    setDone(lists.done);

    // Now, update the backend with the new task order
    try {
      // Update the position of the moved task
      await axiosPublic.put(`/tasks/cat/${movedTask._id}`, {
        category: movedTask.category,
        position: movedTask.position, // Send the new position to the server
      });

      toast.success('Task Reordered', {
        position: "top-center",
        autoClose: 1000,
      });

      // Update positions for all tasks in the new category
      await Promise.all(
        updatedTasks.map((task) =>
          axiosPublic.put(`/tasks/cat/${task._id}`, {
            category: task.category,
            position: task.position,
          })
        )
      );
     

      refetch(); // Refetch tasks after updating the order
    } catch (error) {
      console.error("Error updating task position:", error);
    }
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 50) {
      setTitle(e.target.value);
    }
  };
  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 200) {
      setDescription(e.target.value);
    }
  };
  const handleOpenModal = () => {
    setShowAddTaskModal(true)
  }
  const handleAddTask = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = "todo";
    const time = Date.now();
    const userEmail = user.email;
    const position = data?.length || 0;
    const taskInfo = {
      title, description, category, time, userEmail, position
    }
    axiosPublic.post("/tasks", taskInfo)
      .then(res => {
        // console.log("add kor", res.data);
        if (res.data.insertedId) {

          toast.success("New task added"
            , {
              position: "top-center",
              autoClose: 1000,
            });
          // refetch() ;
          form.reset();
          setTitle("");
          setDescription("");
          setShowAddTaskModal(false);
          refetch();
        }
      })
      .catch(er => console.log(er))
    // console.log(taskInfo);
  }
  const handleDelete = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/tasks/${task._id}`)
          .then(res => {
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })

      }
    });
  }
  const handleEdit = (task) => {
    setEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setEditTaskModal(true);
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const editedTaskInfo = {
      title, description
    }

    axiosPublic.put(`/tasks/${editTask._id}`, editedTaskInfo)
      .then(res => {
        // console.log(res.data);
        if (res.data.matchedCount > 0) {
          toast.success('Task Updated', {
            position: "top-center",
            autoClose: 1000,
          });
          // refetch() ;
          form.reset();
          setTitle("");
          setDescription("");
          setEditTaskModal(false);
          refetch();
        }
      })
      .catch(er => console.log(er))
    // console.log(taskInfo);
  }

  if (allTasksPending) {
    return <div className="min-h-[80vh] flex justify-center items-center">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  }

  return (
    <>
      <div
        // data-aos="fade-left"
        className="hero flex min-h-[94vh] justify-start items-start pt-32 pb-20 px-3 md:px-0 text-base-content"
      >
        {/* <div className="hero-overlay bg- bg-opacity-60"></div> */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div 
             
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* To-Do List */}
                <Droppable droppableId="todo">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="  p-3 rounded-2xl min-h-[50vh] space-y-3 bg-base-300">
                      <h2 className="text-2xl font-bold text-center text-accent">To-Do</h2>
                      <div className="divider"></div>
                      <button
                        onClick={handleOpenModal}
                        className="btn  border border-gray-600 w-full rounded-xl bg-base-100">Add +</button>
                      {todo.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-base-100 border border-gray-600 p-2 rounded-xl flex justify-between transition delay-150 duration-300 ease-in-out hover:translate-x-3 ">
                              <div>
                                <p className="font-bold">{task.title}</p>
                                <p className="text-gray-500">{task.description}</p>
                              </div>
                              <div className="text-xl flex flex-col gap-3">
                                <BiSolidEdit onClick={() => handleEdit(task)} className="cursor-pointer" />
                                <RiDeleteBin6Line onClick={() => handleDelete(task)} className="text-red-600 cursor-pointer" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {/* In Progress List */}
                <Droppable droppableId="inProgress">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className=" p-3 rounded-2xl min-h-[50vh] space-y-3 bg-base-300">
                      <h2 className="text-2xl font-bold text-center text-accent">In Progress</h2>
                      <div className="divider"></div>
                      {inProgress.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-base-100 border border-gray-600 p-2 rounded-xl flex justify-between transition delay-150 duration-300 ease-in-out hover:translate-x-3">
                              <div>
                                <p className="font-bold">{task.title}</p>
                                <p className="text-gray-500">{task.description}</p>
                              </div>
                              <div className="text-xl flex flex-col gap-2">
                                <BiSolidEdit onClick={() => handleEdit(task)} className="cursor-pointer" />
                                <RiDeleteBin6Line onClick={() => handleDelete(task)} className="text-red-600 cursor-pointer" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {/* Done List */}
                <Droppable droppableId="done">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-base-300 p-3 rounded-2xl min-h-[50vh] space-y-3">
                      <h2 className="text-2xl font-bold text-center text-accent ">Done</h2>
                      <div className="divider"></div>
                      {done.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-base-100 border border-gray-600 p-2 rounded-xl flex justify-between transition delay-150 duration-300 ease-in-out hover:translate-x-3">
                              <div>
                                <p className="font-bold">{task.title}</p>
                                <p className="text-gray-500">{task.description}</p>
                              </div>
                              <div className="text-xl flex flex-col gap-2">
                                <BiSolidEdit onClick={() => handleEdit(task)} className="cursor-pointer" />
                                <RiDeleteBin6Line onClick={() => handleDelete(task)} className="text-red-600 cursor-pointer" />
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
            </DragDropContext>

          </div>
        </div>
      </div>

      {/* modal for add task */}
      {showAddTaskModal && (
        <AddTaskModal
          task={editTask}
          setShowAddTaskModal={setShowAddTaskModal}
          handleAddTask={handleAddTask}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          description={description}
          title={title}
        ></AddTaskModal>
      )}

      {/* modal for edit task */}
      {editTaskModal && (
        <EditTaskModal
          task={editTask}
          setEditTaskModal={setEditTaskModal}
          handleEditTask={handleEditTask}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          description={description}
          title={title}
        ></EditTaskModal>


      )}

    </>
  )
}

export default App
