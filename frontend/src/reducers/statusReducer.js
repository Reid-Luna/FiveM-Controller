import { SET_STATUS } from "../actions/types";

export default function(state, action) {
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
