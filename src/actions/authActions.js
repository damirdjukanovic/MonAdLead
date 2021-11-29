import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  GET_ERRORS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
} from "./types";
import { returnErrors } from "./errorActions";

const apiUrl = "https://api.monetizead.com/api/nadir";

//HEADERS CONFIG
const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

//LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get("https://api.monetizead.com/api/nadir/auth/", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.message, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

//LOGOUT USER
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

//LOGIN USER
export const loginUser = (username, password) => (dispatch) => {
  const encodedLogin = btoa(username + ":" + password);

  const config = {
    headers: {
      Authorization: `Basic ${encodedLogin}`,
    },
  };

  axios
    .get(`${apiUrl}/auth/`, config)
    .then((res) => {
      dispatch({
        type: USER_LOADING,
      });
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.message, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};
