import * as actions from '../actions/types';
var {VisibilityFilters} = actions;

const initialState = VisibilityFilters.ALL;

export default function filterShow (state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
}