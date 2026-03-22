import { CirclePlus, CircleUserRound, Music } from "lucide-react";
import { NavLink } from "react-router-dom";

function Nav() {
  const baseStyle =
    "rounded-full transition duration-200 flex items-center justify-center px-2 py-2";

  const activeStyle = "bg-pink-500 scale-110";

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 
                 px-3 py-3 
                 bg-white/10 backdrop-blur-md 
                 border border-white/20 
                 rounded-full 
                 shadow-lg text-white"
    >
      <div className="flex gap-5">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/10"}`
          }
        >
          <Music />
        </NavLink>

     
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/10"}`
          }
        >
          <CirclePlus />
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/10"}`
          }
        >
          <CircleUserRound />
        </NavLink>


      </div>
    </div>
  );
}

export default Nav;