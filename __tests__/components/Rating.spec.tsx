import React from 'react';

import { render } from '../../utils/test-utils';
import Rating from '../../components/Rating';
import { fireEvent } from '@testing-library/react';

describe('Rating', () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            id: '1',
            rating: 2,
            getRating: jest.fn(),
        };
    });

    test('should render rating compoent', () => {
        const { getByText } = render(<Rating {...expectedProps} />, {});
        const oneStar = getByText(/1 Star/i);
        const fiveStars = getByText(/5 Star/i);

        expect(expectedProps.getRating).toHaveBeenCalledTimes(1);
        expect(oneStar).toBeVisible();
        expect(fiveStars).toBeVisible();
    });

    test('should return 3 stars with id of 1', () => {
        const returnValue = {
            id: '1',
            stars: '3',
        };

        const { getByText } = render(<Rating {...expectedProps} />, {});
        expect(expectedProps.getRating).toHaveBeenCalledTimes(1);

        const threeStars = getByText(/3 Star/i);
        fireEvent.click(threeStars);

        expect(expectedProps.getRating).toHaveBeenCalledTimes(2);
        expect(expectedProps.getRating).toBeCalledWith(returnValue);
    });
});
