import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const history = useHistory();
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.usersReducer.isLoggedIn);
  const { currentUserName, currentUserId } = useSelector((
    { usersReducer },
  ) => usersReducer, shallowEqual);
  const dispatch = useDispatch();

  const handleClickUser = () => {
    history.push(`/${currentUserId}`);
  };

  const handleClickSignIn = () => {
    dispatch({ type: 'SHOW_MODAL_SIGN_IN', payload: true });
  };

  const handleClickSignUp = () => {
    dispatch({ type: 'SHOW_MODAL_SIGN_UP', payload: true });
  };

  const logOut = () => {
    localStorage.removeItem('userToken');
    dispatch({
      type: 'LOGOUT_USER',
    });
    history.push('/');
  };

  const handleClickNews = () => {
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button onClick={handleClickNews} variant="contained" color="default">
              News
            </Button>
          </Typography>
          {isLoggedIn ? (
            <div>
              <IconButton onClick={logOut} color="inherit">
                <ExitToAppIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickUser}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <div>
                { currentUserName }
              </div>
            </div>
          ) : (
            <div>
              <Button onClick={handleClickSignIn} variant="contained" color="primary">
                Sign in
              </Button>
              <Button onClick={handleClickSignUp} variant="contained" color="primary">
                Sign up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
