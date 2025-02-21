import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Navbar/Authentications/AuthContext";

const Login = () => {
    const { googleLogin } = useContext(AuthContext) ;
    const navigate = useNavigate()
  
  const handleGoogleLogin = () => {
  googleLogin()
  .then(res => {
    console.log(res.user);
    navigate("/")
  })
  .catch(Er => {
    console.log(Er);
  })
  }
  
  
    return (
      <>
        <div
  
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/9kP47mMX/4890914.jpg)",
          }}>
          {/* <div className="hero-overlay bg- bg-opacity-60"></div> */}
          <div className=" w-full max-w-4xl mx-auto text-black  pt-20 md:pt-0 pb-10">
            <div className="text-center space-y-5">
              <img src="https://i.ibb.co.com/pjWHjZhH/43029.jpg" 
              className="mx-auto w-auto md:max-w-sm"
               alt="" />
              <h1 className=" text-2xl md:text-5xl font-bold font-serif">Simplify Your Tasks</h1>
              <p className="">Manage, track, and collaborate on tasks effortlessly. Streamline workflows, set priorities, and stay organized with real-time updates. Boost productivity and ensure smooth task management for individuals and teams with ease.</p>
              <button 
              onClick={handleGoogleLogin}
              className="btn btn-accent btn-outline border-2 rounded-4xl" >Lets Get Started</button>
            </div>
          </div>
        </div>
       
  
      </>
    )
};

export default Login;