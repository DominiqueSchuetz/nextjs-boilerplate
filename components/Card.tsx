import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';

type Todo = {
    id: string;
    title: string;
    completed: boolean;
    photoUrl: string;
};

type Props = {
    todo?: Todo;
    done: (id: string) => void;
};

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
        marginTop: '2em',
    },
    media: {
        height: 140,
    },
});

const MediaControlCard: React.FC<Props> = (props) => {
    const { todo, done } = props;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {/* <CardMedia className={classes.media} image={todo.photoUrl} title="Contemplative Reptile" /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                        {todo.title}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                        continents except Antarctica
                    </Typography> */}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" size="small" color="primary" onClick={() => done(todo.id)}>
                    Done
                </Button>
            </CardActions>
        </Card>
    );
};

export default MediaControlCard;
