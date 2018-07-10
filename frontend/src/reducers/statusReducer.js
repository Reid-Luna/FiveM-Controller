import { SET_STATUS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload.status
      };
    default:
      return state;
  }
}
