import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion/dist/es/index";
import { connect } from "react-redux";
import axios from "axios";

import configureStore from "../../store";
import Backdrop from "../backdrop/Backdrop";
import MotionButton from "../../components/motionButton/MotionButton";
import s from "./Modal.module.css";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 250,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const ModalButton = ({ onClick, label }) => (
  <motion.button
    className={s.modalButton}
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);

const Modal = (props) => {
  const { handleClose, token, version, user } = props;

  const first_name = useRef(version === "edit" ? user.data.first_name : "");
  const last_name = useRef(version === "edit" ? user.data.last_name : "");
  const email = useRef(version === "edit" ? user.data.email : "");
  const username = useRef(version === "edit" ? user.data.username : "");
  const password = useRef("");
  const status = useRef(version === "edit" ? user.data.status : "");
  const apiUrl = "https://api.monetizead.com/api/nadir";

  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
      status: status.current.value,
    };

    try {
      await axios.post(
        version === "edit"
          ? `${apiUrl}/admin.users/update/?id=${user.id}`
          : `${apiUrl}/admin.users/create/`,
        body
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
    handleClose();
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className={`${s.modal} ${s.orangeGradient}`}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={s.modalTop}>
          <h4>{version === "edit" ? "Edit user" : "Create user"}</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className={s.group}>
              <input
                type="text"
                name="first_name"
                defaultValue={first_name.current}
                required
                ref={first_name}
              />
              <span className={s.highlight}></span>
              <span className={s.bar}></span>
              <label>First name</label>
            </div>
            <div className={s.group}>
              <input
                type="text"
                name="last_name"
                defaultValue={last_name.current}
                required
                ref={last_name}
              />
              <span className={s.highlight}></span>
              <span className={s.bar}></span>
              <label>Last name</label>
            </div>
            <div className={s.group}>
              <input
                type="text"
                name="email"
                defaultValue={first_name.current}
                required
                ref={email}
              />
              <span className={s.highlight}></span>
              <span className={s.bar}></span>
              <label>Email</label>
            </div>
            <div className={s.group}>
              <input
                type="text"
                name="username"
                defaultValue={username.current}
                required
                ref={username}
              />
              <span className={s.highlight}></span>
              <span className={s.bar}></span>
              <label>Username</label>
            </div>
            {version !== "edit" && (
              <div className={s.group}>
                <input
                  type="password"
                  required
                  name="password"
                  ref={password}
                />
                <span className={s.highlight}></span>
                <span className={s.bar}></span>
                <label>Password</label>
              </div>
            )}
            <div className={`${s.group} ${s.selectStatus}`}>
              <p>Status</p>
              <select name="status" defaultValue={status.current} ref={status}>
                <option value="1">Admin</option>
                <option value="2">User</option>
                <option value="3">Manager</option>
              </select>
            </div>
            <div className={s.createUserButtonDiv}>
              <MotionButton
                text={version === "edit" ? "Update" : "Create"}
                color="#2ea44f"
              />
            </div>
          </form>
        </div>
      </motion.div>
    </Backdrop>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(Modal);
