import React from 'react';
import { Todos } from '../../lib/TodosContext';
import { Status } from '../../types';

import { render } from '../../utils/test-utils';
import Card from '../../components/Card';

describe('Card', () => {
    const todos: Todos = { id: '1', title: 'New title', status: Status[1] };

    let expectedProps = {
        todos,
    };

    beforeEach(() => {
        expectedProps = {
            todos,
        };
    });

    test('should render card', () => {
        const { getByText } = render(<Card todo={expectedProps.todos} />, {});
        const todoTitle = getByText(expectedProps.todos.title);
        const todoStatus = getByText(expectedProps.todos.status);

        expect(todoTitle).toBeVisible();
        expect(todoStatus).toBeVisible();
    });
});
