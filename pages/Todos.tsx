import React, { useState, useEffect, createRef } from 'react';
import { NextPage, NextPageContext } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import PrimarySearchAppBar from '../components/Navigation-Top';
import Card from '../components/Card';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import * as fetch from 'node-fetch';
import { Typography } from '@material-ui/core';

type Todos = {
    readonly id: string;
    readonly title: string;
    readonly completed: string;
};

type Context = NextPageContext;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: '3em 0',
                width: '100%',
            },
        },
        headline: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2em',
        },
        complete: {
            display: 'flex',

            justifyContent: 'center',
        },
    }),
);

const Todos: NextPage<unknown> = (props) => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const classes = useStyles();

    useEffect(() => {
        setTodos(props['jsonPayloadTodos']);
    }, [setTodos]);

    const deleteTodoById = (id: string) => {
        const filteredArray = todos.filter((todo: Todos) => todo.id !== id);
        setTodos(filteredArray);
    };

    const handleOnChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        if (e.key === 'Enter') {
            setInputValue(e.target.value);
            e.preventDefault();
            setInputValue('');
            addNewTodoItem(inputValue);
        }
    };

    const addNewTodoItem = (value: string) => {
        const addedTodoItem = {
            id: todos.length + 10,
            title: value,
            completed: false,
        };
        setTodos([...todos, addedTodoItem]);
    };

    const allComplete = (
        <Container className={classes.complete}>
            <Typography variant="h2">Hey, everything is done!</Typography>
            <DoneOutlineIcon style={{ color: 'green' }} />
        </Container>
    );

    return (
        <>
                                                    <PrimarySearchAppBar />
            <div className={classes.headline}>
                <Typography variant="h2">Todo App</Typography>
            </div>
            <Container maxWidth="xl">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-basic"
                        label="What else to do?"
                        variant="outlined"
                        color="primary"
                        onChange={handleOnChange}
                        value={inputValue}
                        onKeyPress={handleSubmit}
                    />
                </form>
                <>
                    {(todos.length && todos.map((todo) => <Card key={todo.id} todo={todo} done={deleteTodoById} />)) ||
                        allComplete}
                </>
            </Container>
        </>
    );
};

export default Todos;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Todos.getInitialProps = async (_ctx: Context) => {
    const resTodos = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const jsonPayloadTodos: Todos[] = await resTodos.json();

    return {
        jsonPayloadTodos,
    };
};
