/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import BottomNav from '../components/BottomNav';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PrimarySearchAppBar from '../components/Navigation-Top';
import Card from '../components/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as fetch from 'node-fetch';
import { Typography } from '@material-ui/core';
import { withFirebaseAuthentication } from '../utils/withFirebaseAuthentication';

import { TodosContext, Todos as TodoType } from '../lib/TodosContext';
import { TodosFilterContext } from '../lib/TodosFilterContext';
import { FilterBy, Status } from '../types';

type Todos = {
    readonly id: string;
    readonly title: string;
    readonly completed: boolean;
    length?: number;
};

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
            alignItems: 'center',
            height: '40vh',
        },
        gridContainer: {
            paddingLeft: '40px',
            paddingRight: '40px',
        },
        itemContainer: {
            marginBottom: '5em',
        },
    }),
);

type TodoProps = {
    readonly todos: TodoType[];
};

const Todos: NextPage<TodoProps | any> = ({ todos }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [todoList, setTodosList] = useState<TodoType[]>([]);

    const value = useMemo(() => ({ todoList, setTodosList }), [todoList, setTodosList]);

    const [filterValue, setFilterValue] = useState<FilterBy>(FilterBy.all);
    const filterMemoValue = useMemo(() => ({ filterValue, setFilterValue }), [filterValue, setFilterValue]);

    const classes = useStyles();

    useEffect(() => {
        setTodosList(todos || []);
    }, []);

    const handleOnChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setInputValue(e.target.value);
            setInputValue('');
            addNewTodoItem(inputValue);
        }
    };

    const addNewTodoItem = (value: string) => {
        if (value.length < 2) return;
        const addedTodoItem = {
            id: new Date().toISOString(),
            title: value.toLocaleLowerCase().trim(),
            status: Status[1],
            completed: false,
        };
        setTodosList([addedTodoItem, ...todoList]);
    };

    const allComplete = (
        <Container className={classes.complete}>
            <Typography variant="h2">Hey, everything is done!</Typography>
        </Container>
    );

    const CardItem = (todo: Todos) => (
        <Grid className={classes.itemContainer} key={todo.id} item xs={12} sm={6} md={4}>
            <Card key={todo.id} todo={todo} />
        </Grid>
    );

    const renderListByFilter = (filterValue: FilterBy) => {
        if (filterValue === FilterBy.open) {
            return todoList.filter((todo: Todos) => !todo.completed).map((todo: Todos) => CardItem(todo));
        } else if (filterValue === FilterBy.done) {
            return todoList.filter((todo: Todos) => todo.completed).map((todo: Todos) => CardItem(todo));
        } else {
            return todoList.map((todo: Todos) => CardItem(todo));
        }
    };

    return (
        <>
            <TodosContext.Provider value={value}>
                <TodosFilterContext.Provider value={filterMemoValue}>
                    <PrimarySearchAppBar />
                    <div className={classes.headline}>
                        <Typography variant="h2">Todo App</Typography>
                    </div>
                    <Container maxWidth="xl">
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                inputProps={{ 'data-testid': 'inputfield' }}
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
                            <Grid className={classes.gridContainer} container spacing={4} justify="center">
                                {(todoList?.length && renderListByFilter(filterValue)) || allComplete}
                            </Grid>
                        </>
                    </Container>
                    <BottomNav />
                </TodosFilterContext.Provider>
            </TodosContext.Provider>
        </>
    );
};

export default withFirebaseAuthentication(Todos);

// export async function getServerSideProps(): Promise<any> {
//     try {
//         const resTodos = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
//         if (!resTodos) return;

//         const jsonPayloadTodos: Todos[] = (await resTodos.json()) || [];
//         return {
//             jsonPayloadTodos,
//         };
//     } catch (error) {
//         console.error(error);
//         return error as { message: string };
//     }
// }
