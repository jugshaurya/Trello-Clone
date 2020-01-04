import userActionTypes from "./user.types";

const INITIAL_STATE = {
  user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.GET_USER_VIA_TOKEN_START:
    case userActionTypes.GET_USER_VIA_TOKEN_SUCCESS:
    case userActionTypes.GET_USER_VIA_TOKEN_FAILURE:
      return {
        ...state,
        user: action.payload
      };

    default:
      return { ...state };
  }
};

export default userReducer;
