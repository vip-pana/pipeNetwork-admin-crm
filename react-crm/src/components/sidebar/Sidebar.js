import { NavLink } from "react-router-dom";

// STYLESHEETS & ICONS
import "./sidebar.scss";
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">PipeNetwork</span>
                </NavLink>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <NavLink to={"/dashboard"} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? 'link active' : 'link')} >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </NavLink>
                    <p className="title">LISTS</p>
                    <NavLink to="/dashboard/contacts" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Contatti</span>
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard/leads" style={{ textDecoration: "none" }}>
                        <li>
                            <GroupIcon className="icon" />
                            <span>Leads</span>
                        </li>
                    </NavLink>
                    <NavLink to={"/"} onClick={()=>{localStorage.removeItem("token")}} style={{ textDecoration: "none" }} >
                        <li>
                            <ExitToAppIcon className="icon" />
                            <span>Logout</span>
                        </li>
                    </NavLink>
                </ul>
            </div>
            <div className="bottom">
            </div>
        </div>
      );
}