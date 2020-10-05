import { createContext } from 'react';
import { FilterBy } from '../types';

export interface TodoFilterContextValue {
    filterValue: FilterBy;
    setFilterValue: (value: FilterBy) => void;
}

const listInitial: TodoFilterContextValue = {
    filterValue: FilterBy.all,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setFilterValue: () => {},
};

export const TodosFilterContext = createContext<TodoFilterContextValue>(listInitial);
