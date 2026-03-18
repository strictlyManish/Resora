import { CircleUserRound, CopyPlus, Earth, Music } from "lucide-react";
import { NavLink } from "react-router-dom";

function Nav() {
  const baseStyle =
    "p-2 rounded-full transition duration-200 flex items-center justify-center";

  const activeStyle = "bg-white/20 scale-110";

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 
                 px-6 py-3 
                 bg-white/10 backdrop-blur-md 
                 border border-white/20 
                 rounded-full 
                 shadow-lg text-white"
    >
      <div className="flex gap-6">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/10"}`
          }
        >
          <Music />
        </NavLink>

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/10"}`
          }
        >
          <Earth />
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/10"}`
          }
        >
          <CircleUserRound />
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/10"}`
          }
        >
          <CopyPlus />
        </NavLink>

      </div>
    </div>
  );
}

export default Nav;