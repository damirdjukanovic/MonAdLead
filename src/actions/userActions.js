import {
  ADMIN_CREATE_USER,
  ADMIN_LIST_ALL_USERS,
  ADMIN_GET_USER,
  ADMIN_DELETE_USER,
  ADMIN_UPDATE_USER,
  GET_ERRORS,
  LOADING,
} from "./types";

import axios from "axios";

const apiUrl = "https://api.monetizead.com/api/nadir";

export const createUser = (body) => (getState, dispatch) => {
  const token = getState().auth.token;

  const config = {
    "Content-Type": "application/json",
  };

  if (token) {
    config["Authorization"] = `Bearer ${token}`;
  }

  axios.post(`${apiUrl}/admin.users/create/`, body, config).then();
};
