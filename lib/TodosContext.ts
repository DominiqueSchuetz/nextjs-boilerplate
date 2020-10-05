import { createContext } from 'react';
import { Status } from '../types';

export interface Todos {
    id: string | undefined;
    title: string | undefined;
    completed?: boolean;
    rating?: number;
    status?: string | undefined;
}

export interface TodoListContextValue {
    todoList: Todos[];
    setTodosList: (todos: Todos[]) => void;
}

const listInitial: TodoListContextValue = {
    todoList: [
        {
            id: '',
            title: '',
            completed: false,
            status: Status[0],
            rating: 0,
        },
    ],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setTodosList: (todos) => {},
};

export const TodosContext = createContext<TodoListContextValue>(listInitial);
