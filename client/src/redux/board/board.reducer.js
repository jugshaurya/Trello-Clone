import boardActionTypes from "./board.types";

const INITIAL_STATE = {
  board: null,
  pageBoardId: null,
  isFetchingBoard: false
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case boardActionTypes.GET_SPECIFIC_BOARD_START:
      return { ...state, isFetchingBoard: true, board: null };
    case boardActionTypes.GET_SPECIFIC_BOARD_SUCCESS:
    case boardActionTypes.GET_SPECIFIC_BOARD_FAILURE:
      return { ...state, isFetchingBoard: false, board: action.payload };
    case boardActionTypes.GET_PAGE_BOARD_ID:
      return { ...state, pageBoardId: action.payload };
    default:
      return { ...state };
  }
};

export default boardReducer;