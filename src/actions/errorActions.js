import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//RETURN ERRORS
export const returnErrors = (message, statusCode) => {
  return {
    type: GET_ERRORS,
    payload: { message, statusCode },
  };
};

//CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
