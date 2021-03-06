import listsActionTypes from "./lists.types";

import { createNewActivityASYNC } from "../activities/activities.actions";

const API_BASE_URL = "/api/v1";

// GET ALL LISTS

const getAllListsInBoardASYNCStart = () => ({
  type: listsActionTypes.GET_ALL_LISTS_IN_BOARD_START,
  payload: null
});

const getAllListsInBoardASYNCSuccess = lists => ({
  type: listsActionTypes.GET_ALL_LISTS_IN_BOARD_SUCCESS,
  payload: lists
});

const getAllListsInBoardASYNCFailure = () => ({
  type: listsActionTypes.GET_ALL_LISTS_IN_BOARD_FAILURE,
  payload: null
});

export const getAllListsInBoardASYNC = () => async (dispatch, getState) => {
  dispatch(getAllListsInBoardASYNCStart());
  const boardId = getState().board.boardData.pageBoardId;
  try {
    const response = await fetch(`${API_BASE_URL}/lists/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const lists = await response.json();
    dispatch(getAllListsInBoardASYNCSuccess(lists));
  } catch (err) {
    dispatch(getAllListsInBoardASYNCFailure());
  }
};

//  CREATE A LIST
const createListASYNCStart = () => ({
  type: listsActionTypes.CREATE_LIST_START,
  payload: null
});

const createListASYNCSuccess = list => ({
  type: listsActionTypes.CREATE_LIST_SUCCESS,
  payload: list
});

const createListASYNCFailure = () => ({
  type: listsActionTypes.CREATE_LIST_START,
  payload: null
});

export const createListASYNC = name => async (dispatch, getState) => {
  dispatch(createListASYNCStart());
  const boardId = getState().board.boardData.pageBoardId;

  const newList = { name };
  try {
    const response = await fetch(`${API_BASE_URL}/lists/${boardId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newList)
    });

    const list = await response.json();
    dispatch(createListASYNCSuccess(list));
    dispatch(
      createNewActivityASYNC({ text: `created list **${list.name.trim()}**` })
    );
  } catch (err) {
    dispatch(createListASYNCFailure());
  }
};

//  DELETE A LIST
const deleteListASYNCStart = () => ({
  type: listsActionTypes.DELETE_LIST_START,
  payload: null
});

const deleteListASYNCSuccess = list => ({
  type: listsActionTypes.DELETE_LIST_SUCCESS,
  payload: list
});

const deleteListASYNCFailure = () => ({
  type: listsActionTypes.DELETE_LIST_START,
  payload: null
});

export const deleteListASYNC = list => async (dispatch, getState) => {
  dispatch(deleteListASYNCStart());
  try {
    const boardId = getState().board.boardData.pageBoardId;
    const listToBeDeleted = list;
    const response = await fetch(`${API_BASE_URL}/lists/${boardId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(listToBeDeleted)
    });

    const deletedList = await response.json();
    dispatch(deleteListASYNCSuccess(deletedList));
    dispatch(
      createNewActivityASYNC({ text: `deleted list **${list.name.trim()}**` })
    );
  } catch (err) {
    dispatch(deleteListASYNCFailure());
  }
};
