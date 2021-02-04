import * as actions from '../actions/types'

export default function todoReducer(state = [], action) {
  switch (action.type) {
    case actions.ADD_TODO: 
      return [
        ...state, 
        {
          todo: action.todo,
          id: action.id,
          isCompleted: false
        }
      ]
    case actions.EDIT_TODO:
      return state.map(todo => {
        return todo.id === action.id
          ? Object.assign({}, todo, { todo: action.todo })
          : todo
      })
    case actions.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case actions.TOGGLE_TODO:
      return state.map(todo => {
          return todo.id === action.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo 
      })
    default: 
      return state
  }
}
