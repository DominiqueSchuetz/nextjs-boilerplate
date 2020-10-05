import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { TodosContext } from '../lib/TodosContext';
import { TodosFilterContext } from '../lib/TodosFilterContext';
import { FilterBy } from '../types';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: '0',
        marginBottom: '0',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
    },
});

const BottomNav = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { todoList, setTodosList } = useContext(TodosContext);
    const { filterValue, setFilterValue } = useContext(TodosFilterContext);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                data-testid="filter-button-all"
                label="All"
                icon={<RestoreIcon />}
                onClick={() => setFilterValue(FilterBy.all)}
            />
            <BottomNavigationAction
                data-testid="filter-button-open"
                label="Open"
                icon={<FavoriteIcon />}
                onClick={() => setFilterValue(FilterBy.open)}
            />
            <BottomNavigationAction
                data-testid="filter-button-completed"
                label="Completed"
                icon={<LocationOnIcon />}
                onClick={() => setFilterValue(FilterBy.done)}
            />
            <BottomNavigationAction
                data-testid="filter-button-delete-all"
                label="Delete All"
                icon={<LocationOnIcon />}
                onClick={() => setTodosList([])}
            />
        </BottomNavigation>
    );
};

export default BottomNav;
