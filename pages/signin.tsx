import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { errorMessages, validations, loginUser } from '../utils';
import { initialState, loginReducer } from '../store/loginReducer';
import { ERROR_ACTION, SUCCESS_ACTION, LOGIN_ACTION, LOGOUT_ACTION } from '../store/action.types';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignInSide = (): JSX.Element => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();

    const [state, dispatch] = useReducer(loginReducer, initialState);
    const { isLoading, error, isLoggedIn } = state;

    const onSubmit = async (userFormData: { email: string; password: string }) => {
        dispatch({ type: LOGIN_ACTION });
        try {
            await loginUser(userFormData);
            dispatch({ type: SUCCESS_ACTION });
        } catch (error) {
            dispatch({ type: ERROR_ACTION });
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {isLoggedIn ? (
                        <>
                            <h1>Logged in !</h1>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => dispatch({ type: LOGOUT_ACTION })}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                            {error && <p className="error">{error}</p>}
                            <TextField
                                data-testid="email"
                                inputRef={register({
                                    required: true,
                                    minLength: 6,
                                    maxLength: 40,
                                    pattern: validations.emailRegex,
                                })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={errors.email ? true : false}
                                helperText={errorMessages.email[errors.email?.type]}
                            />
                            <TextField
                                data-testid="password"
                                inputRef={register({ required: true, minLength: 8, maxLength: 15 })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={errors.password ? true : false}
                                helperText={errorMessages.password[errors.password?.type]}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                disabled={errors.email !== undefined || errors.password !== undefined || isLoading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {isLoading ? 'Signing in....' : 'Sign In'}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/todos    " as={`/todos`}>
                                        <a>Go back to Todos</a>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" as={`/signup`}>
                                        <a>Don't have an account? Sign Up</a>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default SignInSide;
