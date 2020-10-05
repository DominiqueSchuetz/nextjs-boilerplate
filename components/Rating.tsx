import React, { useEffect, useMemo, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { ReturnValueRating } from '../types';

type RatingProps = {
    readonly id?: string;
    readonly rating: number;
    readonly getRating?: (returnValue: ReturnValueRating) => void;
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

const HalfRating: React.FC<RatingProps> = ({ getRating, id, rating }) => {
    const classes = useStyles();
    const [rating2, setRating] = useState<ReturnValueRating>({ id: null, stars: undefined });

    useEffect(() => {}, []);

    useMemo(() => {
        getRating(rating2);
    }, [setRating, rating2]);

    const handleOnChange = (event: any) => {
        setRating({ id: event.target.name, stars: event.target.value });
    };

    return (
        <div className={classes.root}>
            <Rating name={id} value={rating} defaultValue={1} precision={1} onChange={handleOnChange} />
        </div>
    );
};

export default HalfRating;
