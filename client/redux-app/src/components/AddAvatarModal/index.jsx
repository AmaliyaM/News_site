import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

export default function AddNewsModal(props) {
  const classes = useStyles();
  const fileRef = useRef();
  const [theme, setTheme] = useState();
  const [tags, setTags] = useState();
  const [text, setText] = useState();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.utilsReducer.isModalAddAvatarShown);
  const userId = useSelector((state) => state.usersReducer.currentUserId);
  const userName = useSelector((state) => state.usersReducer.currentUserName);

  const handleCloseAddAvatar = () => {
    dispatch({ type: 'SHOW_MODAL_ADD_AVATAR', payload: false });
  };
  const handleAddAVatar = () => {
    const payload = {
      image,
      userId,
    };

    dispatch({ type: 'ADD_AVATAR', payload });
  };

  const handleLoadImage = () => {
    setImage(fileRef.current.files[0]);
  };

  return (
    <Dialog open={showModal} onClose={handleCloseAddAvatar} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add news</DialogTitle>
      <DialogContent>
        <Container className={classes.mainContainer} component="main" maxWidth="xs">
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <TextField
                  inputRef={fileRef}
                  variant="filled"
                  fullWidth
                  name="avatar"
                  label="Image"
                  type="file"
                  id="filled-textarea"
                  onChange={handleLoadImage}
                />
              </Grid>
              <Button
                onClick={handleAddAVatar}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add
              </Button>
              <Button
                onClick={handleCloseAddAvatar}
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
  );
}
