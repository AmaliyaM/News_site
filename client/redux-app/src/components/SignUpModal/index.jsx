import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    border: 1,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpModal(props) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.utilsReducer.isModalSignUpShown);
  const handleCloseSignUp = () => {
    dispatch({ type: 'SHOW_MODAL_SIGN_UP', payload: false });
  };
  const handleSignup = () => {
    const payload = {
      username,
      email,
      password,
    };

    dispatch({ type: 'SIGNUP_USER', payload });
  };
  return (
    <>
      {showModal
    && (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.closeButton}>
        <Button onClick={handleCloseSignUp} variant="contained" color="secondary">
          Close
        </Button>
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSignup}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
    ) }
    </>
  );
}
