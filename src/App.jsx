import { useContext, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { AuthContext } from "./Components/Navbar/Authentications/AuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "./Components/Navbar/Authentications/AxiosPublic";



function App() {

  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const axiosPublic = useAxiosPublic() ;

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
    setShowModal(true)
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
        console.log(res.data);
        if(res.data.insertedId){
            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              // refetch() ;
              form.reset() ;
              setTitle("");
              setDescription("");
              setShowModal(false) 
        }
    })
    .catch(er => console.log(er))
    
    console.log(taskInfo);
  }

  return (
    <>
      <div

        className="hero flex h-screen justify-start items-start pt-32 pb-20"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/9kP47mMX/4890914.jpg)",
        }}>
        {/* <div className="hero-overlay bg- bg-opacity-60"></div> */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-base-content">
              <div className="border border-gray-500 rounded-2xl p-3 space-y-3">
                <h2 className="text-2xl font-bold">To-Do</h2>
                <button
                  onClick={handleOpenModal}
                  className="btn btn-outline">Add +</button>
              </div>
              <div>2</div>
              <div>3</div>
            </div>

          </div>
        </div>
      </div>

      {/* modal  */}
      {showModal && (
        <div className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box relative min-h-[30vh]">
            <button
              onClick={() => setShowModal(false)} // Close modal
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
                    <button type="submit" className="btn btn-accent mx-auto w-full">Add Task</button>
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
