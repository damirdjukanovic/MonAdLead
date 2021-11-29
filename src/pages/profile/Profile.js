import React, { useEffect, useState } from "react";
import s from "./Profile.module.css";
import { connect } from "react-redux";

import { getStatus } from "../../components/table/Table";
import Navbar from "../../components/navbar/Navbar";
import AdjustIcon from "@mui/icons-material/Adjust";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Profile(props) {
  const { user } = props;

  return (
    <>
      <Navbar />
      <div className="content">
        <div className={s.Profile}>
          <div className={s.aboutCard}>
            <div className={s.profileTop}>
              <div className={s.profilePicture}>
                <img
                  src="https://www.surgeinstitute.org/wp-content/uploads/2015/04/Facebook-no-profile-picture-icon-620x389.jpg"
                  alt="profile"
                />
              </div>
              <p>
                {user.data.first_name} {user.data.last_name}
              </p>
            </div>
            <div className={s.profileBottom}>
              <AdjustIcon />
              <p>{getStatus(user.data.status)}</p>
            </div>
            <div className={s.profileBottom}>
              <MailOutlineIcon />
              <p>{user.data.email}</p>
            </div>
            <div className={s.profileSocial}>
              <FacebookIcon />
              <TwitterIcon />
              <LinkedInIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);
