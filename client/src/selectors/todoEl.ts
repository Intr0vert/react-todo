import { createSelector } from 'reselect';
import { TodoState, Todo } from '../types/todos';

const getSort = (state: TodoState) => state.showAll;

const getData = (state: TodoState) => state.data;

export const getSortedTodos = createSelector(
    getSort,
    getData,
    (getSort, getData) => getData.filter((el: Todo) => 
        (!getSort && !el.isDone) || getSort)
);