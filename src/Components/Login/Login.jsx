/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Navbar/Authentications/AuthContext";
import { toast } from "react-toastify";
import useAxiosPublic from "../Navbar/Authentications/AxiosPublic";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRightLong } from "react-icons/fa6";

const Login = () => {

  useEffect(() => {
    AOS.init({
        duration: 2000,
        once: true,
        offset: 100
    });
}, []);

    const navigate = useNavigate()
    const { googleLogin, user} = useContext(AuthContext) ;
  const axiosPublic = useAxiosPublic() ;

const handleGoogleLogin = () => {

if(user){
  navigate("/") ;
  return ;
}

googleLogin()
.then(res => {
  // console.log(res.user.email);
  toast.success(`Welcome ${res.user.displayName}`, {
    position: "top-center",
    autoClose: 1000,
  });
  navigate("/")

  const userInfo = {
    name : res.user.displayName,
    email : res.user.email,
    userID : res.user.uid,
    photo : res.user.photoURL,
  }
  axiosPublic.get(`/users?email=${res.user.email}`)
  .then(response => {
    // console.log(response.data);
    if(!response.data){
      axiosPublic.post("/users", userInfo)
      .then(res => {
        console.log(res);
      })
      .catch(er => console.log(er))
    }
  })
  .catch(er => console.log(er))
})
.catch(Er => {
  console.log(Er);
})
}
  
  
    return (
      <>
        <div
  
          className="hero min-h-[94vh] pt-20 flex justify-center items-center px-3 md:px-0 text-center md:text-left">
          {/* <div className="hero-overlay bg- bg-opacity-60"></div> */}
          <div className=" w-full max-w-7xl mx-auto text-base-content ">
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-5 justify-center items-center gap-10">
              <img
               data-aos="fade-right"
              src="https://i.ibb.co.com/bZbZwmc/43029.png" 
              className="mx-auto w-auto rounded-2xl"
               alt="" />
         <div className="space-y-6">
         <h1
          data-aos="fade-left"
         className=" text-2xl md:text-5xl font-bold font-serif ">Simplify Your Tasks</h1>
              <p 
               data-aos="fade-left"
              className="text-gray-500">Turn your to-do list into done! Our powerful task management system is designed to streamline your workflow, boost productivity, and keep you ahead of deadlines. Whether you're managing projects, collaborating with a team, or organizing personal tasks, our intuitive platform helps you stay focused and efficient. Say goodbye to missed deadlines and scattered notes—plan, prioritize, and accomplish more with ease. Experience seamless task tracking, real-time collaboration, and smart reminders. Get started today and take control of your productivity!</p>
              <button 
               data-aos="fade-left"
              onClick={handleGoogleLogin}
              className="btn btn-accent btn-outline bg-black hover:bg-gray-900 duration-300 text-white border-2 rounded-4xl mb-10" >Lets Get Started <FaArrowRightLong className="ml-2" /></button>
         </div>
            </div>
          </div>
        </div>
       
  
      </>
    )
};

export default Login;