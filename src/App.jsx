
import { useContext, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { AuthContext } from "./Components/Navbar/Authentications/AuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "./Components/Navbar/Authentications/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";



function App() {

  const { user } = useContext(AuthContext);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const axiosPublic = useAxiosPublic();
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editTaskModal, setEditTaskModal] = useState(false) ;


  
  const { data, isPending: allTasksPending, refetch } = useQuery({
    queryKey: [user.email, 'allTasks'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?email=${user.email}`);
      return res?.data || [];
    },
    enabled: !!user?.email
  });
  
  useEffect(() => {
    if (data) {
      setTodo(data.filter(task => task.category === 'todo'));
      setInProgress(data.filter(task => task.category === 'inProgress'));
      setDone(data.filter(task => task.category === 'done'));
    }
  }, [data]);
  


  
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  
    const lists = {
      todo: [...todo],
      inProgress: [...inProgress],
      done: [...done],
    };
  
    const [movedTask] = lists[source.droppableId].splice(source.index, 1);
    movedTask.category = destination.droppableId;
    lists[destination.droppableId].splice(destination.index, 0, movedTask);
  
    setTodo(lists.todo);
    setInProgress(lists.inProgress);
    setDone(lists.done);
  
    if (source.droppableId !== destination.droppableId) {
      try {
        await axiosPublic.put(`/tasks/cat/${movedTask._id}`, { category: movedTask.category });
        refetch(); 
      } catch (error) {
        console.error("Error updating task category:", error);
      }
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
    const taskInfo = {
      title, description, category, time, userEmail
    }
    axiosPublic.post("/tasks", taskInfo)
      .then(res => {
        console.log("add kor",res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "New task added",
            showConfirmButton: false,
            timer: 1500
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
            console.log(res.data);
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
        console.log(res.data);
        if (res.data.matchedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Task Updated",
            showConfirmButton: false,
            timer: 1500
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
        className="hero flex min-h-full justify-start items-start pt-32 pb-20 px-3 md:px-0 text-black"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/9kP47mMX/4890914.jpg)",
        }}>
        {/* <div className="hero-overlay bg- bg-opacity-60"></div> */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="">
          <DragDropContext onDragEnd={handleDragEnd}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* To-Do List */}
      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="border p-3 rounded-2xl min-h-[50vh] space-y-3">
            <h2 className="text-2xl font-bold text-center">To-Do</h2>
            <div className="divider"></div>
            <button
                    onClick={handleOpenModal}
                    className="btn btn-outline w-full rounded-xl">Add +</button>
            {todo.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="border p-2 rounded-xl flex justify-between">
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

      {/* In Progress List */}
      <Droppable droppableId="inProgress">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="border p-3 rounded-2xl min-h-[50vh] space-y-3">
            <h2 className="text-2xl font-bold text-center">In Progress</h2>
            <div className="divider"></div>
            {inProgress.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="border p-2 rounded-xl flex justify-between">
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
          <div {...provided.droppableProps} ref={provided.innerRef} className="border p-3 rounded-2xl min-h-[50vh] space-y-3">
            <h2 className="text-2xl font-bold text-center">Done</h2>
            <div className="divider"></div>
            {done.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="border p-2 rounded-xl flex justify-between">
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
        <div className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box relative min-h-[30vh]">
            <button
              onClick={() => setShowAddTaskModal(false)} // Close modal
              className="absolute top-5 right-5 text-3xl text-red-500 cursor-pointer"
            >
              <IoMdCloseCircle />
            </button>
            <h3 className="font-bold text-2xl text-accent text-center">
              Add New Task
            </h3>
            <p className="pt-4 text-gray-500 text-center">
              Please complete the form to proceed
            </p>
            <div className="modal-action">

              <div className=" w-full max-w-sm mx-auto">
                <form
                  onSubmit={handleAddTask}
                  className="card-body">
                  <div className="form-control relative">
                    <label className="label pb-1">
                      <span className="label-text">Title</span>
                    </label>
                    <input type="text"
                      name="title"
                      value={title}
                      onChange={handleTitleChange}
                      className="input input-bordered"
                      required >
                    </input>
                    <p
                      className="text-sm text-gray-500 absolute right-2 -top-0"
                    >{50 - title.length}/50</p>
                  </div>
                  <div className="form-control relative">
                    <label className="label pb-1">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                      name="description"
                      className="textarea textarea-bordered"
                      required />
                    <p
                      className="text-sm text-gray-500 absolute right-2 -top-0"
                    >{200 - description.length}/200</p>
                  </div>
                  <div className="form-control mt-6">
                    <button disabled={!title || !description} type="submit" className="btn btn-accent mx-auto w-full">Add Task</button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* modal for edit task */}
      {editTaskModal && (
        <div className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box relative min-h-[30vh]">
            <button
              onClick={() => setEditTaskModal(false)} // Close modal
              className="absolute top-5 right-5 text-3xl text-red-500 cursor-pointer">
              <IoMdCloseCircle />
            </button>
            <h3 className="font-bold text-2xl text-accent text-center">
              Edit Task
            </h3>
            <p className="pt-4 text-gray-500 text-center">
              Please complete the form to proceed
            </p>
            <div className="modal-action">

              <div className=" w-full max-w-sm mx-auto">
                <form
                  onSubmit={handleEditTask}
                  className="card-body">
                  <div className="form-control relative">
                    <label className="label pb-1">
                      <span className="label-text">Title</span>
                    </label>
                    <input type="text"
                      name="title"
                      value={title}
                      onChange={handleTitleChange}
                      className="input input-bordered"
                      required >
                    </input>
                    <p
                      className="text-sm text-gray-500 absolute right-2 -top-0"
                    >{50 - title?.length}/50</p>
                  </div>
                  <div className="form-control relative">
                    <label className="label pb-1">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                      name="description"
                      className="textarea textarea-bordered"
                      required />
                    <p
                      className="text-sm text-gray-500 absolute right-2 -top-0"
                    >{200 - description?.length}/200</p>
                  </div>
                  <div className="form-control mt-6">
                    <button disabled={!title || !description} type="submit" className="btn btn-accent mx-auto w-full">Edit</button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default App
