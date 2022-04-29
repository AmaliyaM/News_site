import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import jwt from 'jsonwebtoken';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

import EditUserModal from '../../components/EditUserModal';
import AddAvatarModal from '../../components/AddAvatarModal';
import NewsList from '../../components/NewsList';
import avatarIcon from '../../avatar.png';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '99%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function UserPage(props) {
  const classes = useStyles();
  const { match: { params: { user: userId } } } = props;
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState({ field: '', value: '' });
  const dispatch = useDispatch();
  const showEditModal = useSelector((state) => state.utilsReducer.isModalEditUserShown);
  const showAvatarModal = useSelector((state) => state.utilsReducer.isModalAddAvatarShown);
  const userToken = useSelector(({ usersReducer }) => usersReducer.token, shallowEqual);

  const {
    currentUserId,
    currentUserName,
    currentUserEmail,
    currentUserAvatar,
    selectedUser,
    isLoggedIn,
  } = useSelector(({ usersReducer }) => usersReducer, shallowEqual);
  const userNews = useSelector((state) => state.newsReducer.byId);

  const isCurrentUser = useMemo(() => Number(currentUserId)
  === Number(userId), [currentUserId, userId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickEditUser = () => {
    dispatch({ type: 'SHOW_MODAL_EDIT_USER', payload: true });
  };

  const handleClickAddAvatar = () => {
    dispatch({ type: 'SHOW_MODAL_ADD_AVATAR', payload: true });
  };

  useEffect(() => {
    if (isLoggedIn) dispatch({ type: 'FETCH_USER_NEWS_START', payload: { id: userId } });
  }, [isLoggedIn, userId, dispatch, userToken, currentUserId]);

  const dataNews = useMemo(() => {
    if (userId && userNews[userId]) {
      return userNews[userId] && userNews[userId].news;
    }
    return [];
  }, [userId, userNews]);

  useEffect(() => {
    if (!isCurrentUser) dispatch({ type: 'FETCH_USER_DATA', payload: { id: userId } });
  }, [isCurrentUser, userId, dispatch]);

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={(isCurrentUser ? currentUserAvatar : selectedUser.avatar) || avatarIcon}
          title="Avatar"
        />
        <CardContent>
          <Typography variant="h6" color="inherit" component="p">
            Username:
            {isCurrentUser ? currentUserName : selectedUser.userName}
          </Typography>
          <Typography variant="h6" color="inherit" component="p">
            Email:
            {isCurrentUser ? currentUserEmail : selectedUser.email}
          </Typography>
        </CardContent>
        {isCurrentUser && (
          <CardActions disableSpacing>
            <IconButton onClick={handleClickAddAvatar}>
              <AddAPhotoIcon />
            </IconButton>
            <IconButton onClick={handleClickEditUser}>
              <EditIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
      <NewsList filter={filter} dataNews={dataNews} />
      {showEditModal && <EditUserModal />}
      {showAvatarModal && <AddAvatarModal />}
    </>
  );
}
UserPage.propTypes = {
  match: PropTypes.shape.isRequired,
};
