import React from 'react';

import { render } from '../../utils/test-utils';
import { Todos as Todotype } from '../../lib/TodosContext';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';

import Todos from '../../pages/todos';
import firebase from 'firebase/app';

const todos: Todotype[] = [
    { id: '123', title: 'buy milk', completed: false },
    { id: '234', title: 'drink coffee', completed: true },
    { id: '567', title: 'wash dishes', completed: false },
];

describe('Testing of Todos Page', () => {
    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    test('should have text todo app', async () => {
        const { getByText, findByText } = render(<Todos todos={todos} />, {});

        expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
        expect(firebase.auth).toHaveBeenCalledTimes(1);
        expect(firebase.auth().currentUser).toStrictEqual({
            email: 'test@test.de',
            uid: '123456789',
            emailVerified: true,
        });

        expect(getByText('Todo App')).not.toBeNull();
        await findByText('wash dishes');
    });

    test('should have an input filed with label text', () => {
        const { getByLabelText } = render(<Todos todos={todos}></Todos>, {});
        getByLabelText('What else to do?');
    });

    test('should add a new todo card', async () => {
        const { findByTestId, getByText } = render(<Todos todos={todos}></Todos>, {});
        const inputField = await findByTestId('inputfield');

        fireEvent.change(inputField, { target: { value: 'A new todo' } });
        fireEvent.keyPress(inputField, { key: 'Enter', keyCode: 13 });

        await waitFor(() => {
            getByText(/a nEw todo/i);
        });
    });

    test('should delete a todo card', () => {
        const { getAllByText, getByText, queryByText } = render(<Todos todos={todos}></Todos>, {});
        expect(getByText('buy milk')).not.toBeNull();
        const deleteButton = getAllByText('Delete')[0];
        fireEvent.click(deleteButton);

        expect(queryByText('buy milk')).toBeNull();
    });

    xtest('should complete a todo card', () => {
        const { getAllByText, getAllByTestId } = render(<Todos todos={todos}></Todos>, {});
        const allTodos = getAllByTestId('todo-status');
        let openTodos = allTodos.filter((e) => e.textContent === 'Open');

        expect(getAllByText('Revert').length).toBe(1);
        expect(openTodos.length).toBe(2);

        const doneButton = getAllByText('Done')[0];
        fireEvent.click(doneButton);

        openTodos = allTodos.filter((e) => e.textContent === 'Open');
        expect(openTodos.length).toBe(1);

        expect(getAllByText('Revert').length).toBe(2);
    });

    test('should filter completed todos', async () => {
        const { getAllByTestId, getByTestId } = render(<Todos todos={todos}></Todos>, {});

        expect(getAllByTestId('todo-card').length).toBe(3);
        const filterButton = getByTestId('filter-button-completed');

        fireEvent.click(filterButton);

        const findCompleted = getAllByTestId('todo-card');
        expect(findCompleted.length).toBe(1);
    });

    test('should filter open todos', async () => {
        const { getAllByTestId, getByTestId } = render(<Todos todos={todos}></Todos>, {});
        expect(getAllByTestId('todo-card').length).toBe(3);
        const filterButton = getByTestId('filter-button-open');
        fireEvent.click(filterButton);

        expect(getAllByTestId('todo-card').length).toBe(2);
    });

    test('should filter all todos', () => {
        const { getAllByTestId, getByTestId } = render(<Todos todos={todos}></Todos>, {});
        expect(getAllByTestId('todo-card').length).toBe(3);
        const filterButton = getByTestId('filter-button-all');
        fireEvent.click(filterButton);

        expect(getAllByTestId('todo-card').length).toBe(3);
    });

    test('should delete all todos', () => {
        const { getAllByTestId, getByTestId, queryAllByTestId } = render(<Todos todos={todos}></Todos>, {});
        expect(getAllByTestId('todo-card').length).toBe(3);
        const filterButton = getByTestId('filter-button-delete-all');
        fireEvent.click(filterButton);

        expect(queryAllByTestId('todo-card').length).toBe(0);
    });
});
