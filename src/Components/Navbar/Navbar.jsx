import { useContext } from "react";
import { AuthContext } from "./Authentications/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./Authentications/AxiosPublic";
import { ThemeContext } from "./Authentications/ThemeContext";
import { toast } from "react-toastify";

const Navbar = () => {

  const { googleLogin, signOutUser, user } = useContext(AuthContext) ;
  const axiosPublic = useAxiosPublic() ;
  const navigate = useNavigate()
  const { theme, toggleTheme } = useContext(ThemeContext);

const handleGoogleLogin = () => {
googleLogin()
.then(res => {
  console.log(res.user.email);
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
    console.log(response.data);
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
const handleLogout = () => {
  signOutUser()
.then(res => {
  console.log(res);
  toast.success(`User Logged out`, {
    position: "top-center",
    autoClose: 1000,
  });
})
.catch(Er => {
  console.log(Er);
})
}
  
    return (
      <div className="fixed z-50 backdrop-blur-sm bg-black/20 w-full ">
        <div className="px-3 md:px-0">
            <div className="navbar p-0 max-w-7xl mx-auto">
  <div className="navbar-start">
    {/* <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div> */}
    <div className="flex items-center gap-1 ">
  <span className="text-2xl font-bold font-serif text-white bg-black px-2 py-1 rounded-lg shadow-lg">
  Easy <span className="text-accent">Task </span>
  </span>
</div>
  </div>

  <div className="navbar-end">
{
            user
              ? <>
                {
                  user && <div className="dropdown dropdown-hover dropdown-bottom dropdown-end ">
                    <img
                      tabIndex={0} role="button"
                      className="m-1 w-12 h-12 object-cover object-center rounded-full"
                      src={user?.photoURL} alt="" />
                  <div
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] border border-gray-500 px-3 py-5 space-y-3 min-w-[220px]"
                  >
                    <h2 className="text-base-content font-semibold text-xl">{user?.displayName}</h2>
                    <h2 className=" text-gray-500">{user?.email}</h2>
           <div className="flex gap-5 justify-between">
                    <h2 className=" text-gray-500">  Theme : </h2>
           
                    <label className="grid cursor-pointer place-items-center">
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                            className="toggle theme-controller bg-base-100 col-span-2 col-start-1 row-start-1"
                        />
                    </label>
           </div>
           <button 
    onClick={handleLogout}
    className="btn btn-accent rounded-xl">Log Out</button>
                      </div>
                  </div>
                }

              </>
              : <>
              <button 
                  onClick={handleGoogleLogin}
                  className="btn px-9 mr-2 btn-accent btn-outline bg-black hover:bg-gray-900 duration-300 text-white border-2 rounded-4xl">Login </button>
              </>
          }

  </div>
</div>
        </div>
        </div>
    );
};

export default Navbar;