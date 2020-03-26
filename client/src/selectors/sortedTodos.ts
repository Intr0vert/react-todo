import { createSelector } from 'reselect';
import { Todo } from '../types/todos';
import { State } from '../types/state';

const getSort = (state: State) => state.todos.showAll;

const getData = (state: State) => state.todos.data;

export const getSortedTodos = createSelector(
    getSort,
    getData,
    (getSort, getData) => getData.filter((el: Todo) => 
        (!getSort && !el.isDone) || getSort)
);