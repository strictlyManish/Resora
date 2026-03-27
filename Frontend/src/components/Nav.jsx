import { CirclePlus, CircleUserRound, Music } from "lucide-react";
import { NavLink } from "react-router-dom";

function Nav() {
  const baseStyle =
    "rounded-full transition duration-200 transform flex items-center justify-center px-3 py-3 min-w-[40px] min-h-[40px]";
  const activeStyle = "bg-pink-500 scale-110";

  return (
    <div
      className="fixed z-20 bottom-4 left-1/2 -translate-x-1/2 
                 px-2 py-2 
                 bg-white/10 backdrop-blur-md 
                 border border-white/20 
                 rounded-full 
                 shadow-lg text-white "
    >
      <div className="flex gap-5">
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/20"}`
          }
        >
          <Music size={24} />
        </NavLink>

        <NavLink
          to="/create"
          aria-label="Create"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/20"}`
          }
        >
          <CirclePlus size={24} />
        </NavLink>

        <NavLink
          to="/profile"
          aria-label="Profile"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-white/20"}`
          }
        >
          <CircleUserRound size={24} />
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;