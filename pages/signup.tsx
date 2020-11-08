import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app';

import { initialState, signupReducer } from '@/store/signupReducer';
import { SIGNUP_ACTION, SUCCESS_ACTION, ERROR_ACTION, SIGN_UP_MESSAGES } from '@/store/action.types';
import { useAuth } from '../firebase/auth-service';
import { useRouter } from 'next/router';
import { validations, errorMessages } from '@/utils/index';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = (): JSX.Element => {
    const classes = useStyles();
    const { handleSubmit, register, errors } = useForm();
    const { signup } = useAuth();
    const router = useRouter();

    const [state, dispatch] = useReducer(signupReducer, initialState);
    const { isLoading, error } = state;

    const onSubmit = async (userFormData: { email: string; password: string; confirmPassword: string }) => {
        dispatch({ type: SIGNUP_ACTION });

        if (userFormData.password.trim() !== userFormData.confirmPassword.trim()) {
            dispatch({ type: ERROR_ACTION, message: SIGN_UP_MESSAGES.ERROR_CONFIRM_PASSWORD });
            return;
        }

        try {
            const response: firebase.User | firebase.FirebaseError = await signup(
                userFormData.email.trim(),
                userFormData.password.trim(),
            );
            if (response instanceof Error) {
                dispatch({ type: ERROR_ACTION, message: ((response as unknown) as firebase.FirebaseError).message });
                return;
            }

            router.push('/todos');
            dispatch({
                type: SUCCESS_ACTION,
                message: SIGN_UP_MESSAGES.SUCCESS,
            });
        } catch (error) {
            dispatch({ type: ERROR_ACTION });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {error && <p className="error">{error}</p>}
                        <Grid item xs={12}>
                            <TextField
                                data-testid="Email Address"
                                inputRef={register({
                                    required: true,
                                    minLength: 6,
                                    maxLength: 40,
                                    pattern: validations.emailRegex,
                                })}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={errors.email ? true : false}
                                helperText={errorMessages.email[errors.email?.type]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                data-testid="Password"
                                inputRef={register({ required: true, minLength: 8, maxLength: 15 })}
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                data-testid="Confirm Password"
                                inputRef={register({ required: true, minLength: 8, maxLength: 15 })}
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirm-password"
                                autoComplete="current-password"
                                error={errors.confirmPassword ? true : false}
                                helperText={errorMessages.confirmPassword[errors.confirmPassword?.type]}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        data-testid="button"
                        disabled={errors.email !== undefined || errors.password !== undefined || isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isLoading ? 'Signup....' : 'Sign Up'}
                    </Button>
                    <Grid container justify="space-around" direction="column">
                        <Grid item>
                            <Link href="/signin" as={`/signin`}>
                                <a>Already have an account? Sign in</a>
                            </Link>
                        </Grid>
                        <Grid item xs>
                            <Link href="/todos" as={`/todos`}>
                                <a>Go back to Todos</a>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default SignUp;
