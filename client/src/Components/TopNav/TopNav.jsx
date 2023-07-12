import { NavLink } from "react-router-dom";
import "../../styles/TopNav.css";

export function TopNav() {
  const userID = JSON.parse(localStorage.getItem('User')).id;
  return (
    <>
      <nav className="topnav" id="myTopnav">
        <NavLink to="/Info">Info</NavLink>
        <NavLink to="/Posts">Posts</NavLink>
        <NavLink to="/Todos">Todos</NavLink>
        <NavLink to="/Albums">Albums</NavLink>
      </nav>
    </>
  );
}

export default TopNav;
