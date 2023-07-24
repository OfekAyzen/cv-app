import { NavLink } from "react-router-dom";
import "../../styles/TopNav.css";

const handleLogout = (onLogout) => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) onLogout();
};
export function TopNav() {
  return (
    <>
      <nav className="topnav" id="myTopnav">
        <NavLink to="/Info"></NavLink>
      </nav>
    </>
  );
}

export default TopNav;
