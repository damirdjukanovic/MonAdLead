import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion/dist/es/index";
import classNames from "classnames";
import { saveData } from "../../actions/authActions";
import { connect } from "react-redux";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import s from "./Table.module.scss";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import MotionButton from "../motionButton/MotionButton";
import Modal from "../modal/Modal";
import OptionsDropdown from "../optionsDropdown/OptionsDropdown";

export const getStatus = (status) => {
  if (status === 1) return "Admin";
  if (status === 2) return "User";
  if (status === 3) return "Manager";
};

function Table(props) {
  const { setModalUser, setModalVersion, open, close, token } = props;

  const [users, setUsers] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const apiUrl = "https://api.monetizead.com/api/nadir";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(
          `${apiUrl}/admin.users/list/?page=${page}&limit=${limit}&sort_column=id&order_by=ASC`,
          config
        );
        const users = res.data.items;
        setTotalPages(res.data.total.page);
        console.log(users);
        setUsers(users);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchData();
  }, [limit, page]);

  const handlePageNext = () => {
    setPage(page + 1);
  };

  const handlePageBack = () => {
    setPage(page - 1);
  };

  const handleChange = (e) => {
    const resPerPage = Number(e.target.value);
    setLimit(resPerPage);
  };

  const handleDropdown = (id) => {
    setUserId(id);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getColor = (status) => {
    const buttonColor = classNames({
      [s.statusAdmin]: status === 1,
      [s.statusUser]: status === 2,
      [s.statusManager]: status === 3,
    });
    return buttonColor;
  };

  const handleCreateUserButton = () => {
    open();
    setModalVersion("create");
  };

  const renderTableTop = () => {
    return (
      <div className={s.tableTop}>
        <div className={s.tableTopResults}>
          <p>Results : </p>
          <select
            name="results"
            onChange={(e) => handleChange(e)}
            className={s.tableSelect}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className={s.pages}>
          {page !== 1 && (
            <ArrowBackIcon onClick={handlePageBack} className={s.arrowLeft} />
          )}
          <p>{page}</p>
          {page !== totalPages && (
            <ArrowForwardIcon
              onClick={handlePageNext}
              className={s.arrowRight}
            />
          )}
        </div>
        <MotionButton
          text="Add user"
          color="#2596be"
          click={handleCreateUserButton}
        />
      </div>
    );
  };

  const renderTable = () => {
    return (
      <div className={s.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => (
                <React.Fragment key={user.id}>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.data.first_name}</td>
                    <td>{user.data.last_name}</td>
                    <td>{user.data.username}</td>
                    <td>{user.data.email}</td>
                    <td>
                      <p
                        className={`${s.status} ${getColor(user.data.status)}`}
                      >
                        {getStatus(user.data.status)}
                      </p>
                    </td>
                    <td>
                      <div className={s.permissionsCell}>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          className={s.optionsButton}
                        >
                          <ManageAccountsOutlinedIcon
                            id={`${i}`}
                            onClick={() => handleDropdown(user.id)}
                          />
                        </motion.button>
                        {userId === user.id && isDropdownOpen && (
                          <OptionsDropdown
                            user={user}
                            setModalUser={setModalUser}
                            setIsDropdownOpen={setIsDropdownOpen}
                            open={open}
                            setModalVersion={setModalVersion}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className={s.tableContainer}>
        {renderTableTop()}
        {renderTable()}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(Table);
