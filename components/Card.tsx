import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red, green, teal } from '@material-ui/core/colors';

import Rating from './Rating';
import MaterialUIPickers from './DatePicker';

import { Todos, TodosContext } from '../lib/TodosContext';
import { Status, ReturnValueRating } from '../types';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

type CardProps = {
    todo: Todos;
};

const OutlinedCard: React.FC<CardProps> = (props) => {
    const { todo } = props;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const { todoList, setTodosList } = useContext(TodosContext);
    useEffect(() => {}, [todoList, setTodosList]);

    const getRating = React.useCallback(
        (returnValue: ReturnValueRating) => {
            const updatedArray = todoList.map((todo: Todos) => {
                if (todo.id === returnValue.id) {
                    todo.rating = +returnValue.stars;
                    todo.status = Status[returnValue.stars];
                }
                return todo;
            });
            setTodosList(updatedArray);
        },
        [todoList, setTodosList],
    );

    const handleClickDone = (e: string) => {
        const updatedArray = todoList.map((todo: Todos) => {
            if (todo.id === e) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodosList(updatedArray);
    };

    const handleClickDelete = (e: string) => {
        const filteredArray = todoList.filter((todo: Todos) => todo.id !== e);
        setTodosList(filteredArray);
    };

    const isDone = todo.completed ? red.A400 : '';
    const strikeThrough = todo.completed ? 'line-through' : '';

    return (
        <Card data-testid="todo-card" className={classes.root} variant="outlined">
            <CardContent>
                <Typography data-testid="todo-status" className={classes.title} color="textSecondary" gutterBottom>
                    {todo.completed ? 'Done' : 'Open'}
                </Typography>
                <Typography
                    data-testid={todo.title}
                    noWrap
                    variant="h5"
                    component="h2"
                    style={{ textDecoration: strikeThrough, color: isDone }}
                >
                    {todo.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {todo.status}
                </Typography>
                <Rating getRating={getRating} rating={todo.rating} id={todo.id} />
                <Typography variant="body2" component="p"></Typography>
                <MaterialUIPickers />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    style={{ background: red.A400 }}
                    size="small"
                    onClick={() => handleClickDone(todo.id)}
                >
                    {todo.completed ? 'Revert' : 'Done'}
                </Button>
                <Button
                    data-testid={`delete-button-for-${todo.title}`}
                    variant="contained"
                    style={{ background: red.A100 }}
                    size="small"
                    onClick={() => handleClickDelete(todo.id)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default OutlinedCard;
