/* eslint-disable react/prop-types */
import { IoMdCloseCircle } from "react-icons/io";


const AddTaskModal = ({setShowAddTaskModal, handleAddTask, handleTitleChange, handleDescriptionChange , description, title}) => {

    return (
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
    );
};

export default AddTaskModal;