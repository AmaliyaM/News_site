import React, { useState, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
  const showModal = useSelector((state) => state.utilsReducer.isModalAddNewsShown);
  const { currentUserName, currentUserId } = useSelector((
    { usersReducer },
  ) => usersReducer, shallowEqual);
  const handleCloseAddNews = () => {
    dispatch({ type: 'SHOW_MODAL_ADD_NEWS', payload: false });
  };
  const handleAddNews = () => {
    const payload = {
      theme,
      tags,
      text,
      author_id: currentUserId,
      author_name: currentUserName,
      image,
    };

    dispatch({ type: 'ADD_NEWS', payload });
  };

  const handleLoadImage = (e) => {
    setImage(fileRef.current.files[0]);
  };
  return (
    <>
      (
      {' '}
      <Dialog open={showModal} onClose={handleCloseAddNews} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add news</DialogTitle>
        <DialogContent>
          <Container className={classes.mainContainer} component="main" maxWidth="xs">

            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="uname"
                      name="Theme"
                      variant="outlined"
                      required
                      fullWidth
                      id="Theme"
                      label="Theme"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="Tags"
                      label="Tags"
                      name="Tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      multiline
                      required
                      fullWidth
                      name="Text"
                      label="Text"
                      type="text"
                      id="filled-textarea"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      autoComplete="current-password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      inputRef={fileRef}
                      variant="filled"
                      fullWidth
                      name="image"
                      label="Image"
                      type="file"
                      id="filled-textarea"
                      onChange={(e) => handleLoadImage(e)}
                    />
                  </Grid>
                </Grid>
                <Button
                  onClick={handleAddNews}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add
                </Button>
                <Button
                  onClick={handleCloseAddNews}
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
