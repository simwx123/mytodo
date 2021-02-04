
export const getTodosState = store => store.todo;

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).map(id => id) : [];

export const todoFilter = (store, visibilityFilter) => {
    const allTodos = getTodoList(store)
    switch (visibilityFilter) {
    case 'COMPLETED':
      return allTodos.filter(todo => todo.isCompleted);
    case 'INCOMPLETE':
      return allTodos.filter(todo => !todo.isCompleted);
    case 'ALL':
    default:
      return allTodos;
  }
};
