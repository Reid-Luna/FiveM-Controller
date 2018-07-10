import { SET_STATUS } from "../actions/types";

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS:
      return {
        status: action.payload.status
      };
    default:
      return state;
  }
}
