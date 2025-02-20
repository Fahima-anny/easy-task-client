import { useContext } from "react";
import { AuthContext } from "./Authentications/AuthContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const { googleLogin, signOutUser } = useContext(AuthContext) ;
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


const handleLogout = () => {
  signOutUser()
.then(res => {
  console.log(res);
})
.catch(Er => {
  console.log(Er);
})
}
  
    return (
        <div className="bg-accent">
            <div className="navbar  max-w-7xl mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
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
    </div>
    <div className="flex items-center gap-1 ">
  <span className="text-2xl font-bold font-serif text-white bg-black px-2 py-1 rounded-lg shadow-lg">
  Easy <span className="text-accent">Task </span>
  </span>
</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {/* <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li> */}
    </ul>
  </div>
  <div className="navbar-end">
    <button 
    onClick={handleGoogleLogin}
    className="btn">Login </button>
    <button 
    onClick={handleLogout}
    className="btn">Log Out</button>
  </div>
</div>
        </div>
    );
};

export default Navbar;