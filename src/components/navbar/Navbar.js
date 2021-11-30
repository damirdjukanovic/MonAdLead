import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { logout } from "../../actions/authActions";
import s from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = props;
  console.log(user);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const { isAuthenticated } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  return (
    <>
      <div className={s.navbar}>
        <MenuIcon onClick={() => toggleSidebar()} />
        <div className={s.navbarIcons}>
          <NotificationsNoneIcon />
        </div>
        {user && (
          <div className={s.navbarUserName}>
            <p>
              {user.data.first_name} {user.data.last_name}
            </p>
            <div className={s.userProfilePicture}>
              <img
                src="https://www.surgeinstitute.org/wp-content/uploads/2015/04/Facebook-no-profile-picture-icon-620x389.jpg"
                alt="profile"
              />
            </div>
          </div>
        )}
      </div>
      <div className={isOpen ? `${s.sidebar} ${s.active}` : `${s.sidebar}`}>
        <img src="images/monadleadlogo.svg" alt="logo" className={s.logo} />
        <div className={s.adminCategory}>
          <ul>
            <li>
              <Link to="/profile">
                <PermIdentityIcon />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/home">
                <GridViewIcon />
                <span>Dashboard</span>
              </Link>
            </li>
            <Link to="/users">
              <li>
                <PeopleOutlineIcon />
                <span>Users</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className={s.logout} onClick={() => logout()}>
          <LogoutIcon /> <span>Logout</span>
        </div>
      </div>
      {isOpen && (
        <div className={s.overlay} onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
