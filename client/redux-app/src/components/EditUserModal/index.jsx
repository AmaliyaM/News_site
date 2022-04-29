import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

export default function EditUserModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.utilsReducer.isModalEditUserShown);
  const { currentUserEmail, currentUserName, currentUserId } = useSelector((
    { usersReducer },
  ) => usersReducer, shallowEqual);

  const [email, setEmail] = useState(currentUserEmail);
  const [username, setUserName] = useState(currentUserName);
  const [password, setPassword] = useState();
  const handleCloseEditUser = () => {
    dispatch({ type: 'SHOW_MODAL_EDIT_USER', payload: false });
  };
  const handleEditUser = () => {
    const payload = {
      id: currentUserId,
      email,
      username,
      password,

    };

    dispatch({ type: 'EDIT_USER', payload });
    dispatch({ type: 'SHOW_MODAL_EDIT_USER', payload: false });
  };
  return (
    <>
      (
      {' '}
      <Dialog open={showModal} onClose={handleCloseEditUser} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <Container className={classes.mainContainer} component="main" maxWidth="xs">

            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete={username}
                      name="Username"
                      variant="outlined"
                      required
                      fullWidth
                      id="Username"
                      label="Username"
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
                      id="Email"
                      label="Email"
                      name="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      multiline
                      required
                      fullWidth
                      name="Password"
                      label="New password"
                      type="Password"
                      id="filled-textarea"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  onClick={handleEditUser}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Save
                </Button>
                <Button
                  onClick={handleCloseEditUser}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Close
                </Button>
              </form>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      )
    </>
  );
}
