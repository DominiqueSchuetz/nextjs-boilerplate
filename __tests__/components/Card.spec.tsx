import React from 'react';

import { render } from '../../utils/test-utils';
import { Todos } from '../../lib/TodosContext';
import { Status } from '../../types';

import Card from '../../components/Card';

describe('Card', () => {
    const todos: Todos = { id: '1', title: 'New title', status: Status[1] };

    test('should render card', () => {
        const { getByText } = render(<Card todo={todos} />, {});
        const todoTitle = getByText(todos.title);
        const todoStatus = getByText(todos.status);

        expect(todoTitle).toBeVisible();
        expect(todoStatus).toBeVisible();
    });
});
