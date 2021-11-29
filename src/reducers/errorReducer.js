const initialState = {
  message: "",
};

export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        message: "",
      };
    default:
      return state;
  }
}
