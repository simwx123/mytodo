import * as actions from '../actions/types';
var {FiltersTypes} = actions;

const initialState = FiltersTypes.ALL;

export default function filterShow (state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}