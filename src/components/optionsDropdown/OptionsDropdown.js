import { useState, useEffect } from "react";
import s from "./OptionsDropdown.module.css";
import axios from "axios";
import { connect } from "react-redux";

const apiUrl = "https://api.monetizead.com/api/nadir";

function OptionsDropdown(props) {
  const {
    user,
    token,
    setIsDropdownOpen,
    setModalVersion,
    setModalUser,
    open,
  } = props;

  useEffect(() => {
    setModalUser(user);
  }, []);

  const handleDelete = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(`${apiUrl}/admin.users/delete/?id=${user.id}`, config);
    setIsDropdownOpen(false);
  };

  const handleEdit = () => {
    open();
    setModalVersion("edit");
  };

  return (
    <div className={s.PermissionDropdown}>
      <div className={s.permissionEdit} onClick={handleEdit}>
        Edit
      </div>
      <div className={s.permissionSettings}>Permissions</div>
      <div className={s.permissionDelete} onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(OptionsDropdown);
