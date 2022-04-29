import jwt from 'jsonwebtoken';

const localStorageToken = localStorage.getItem('userToken');

const parsedToken = localStorageToken !== null ? jwt.decode(localStorage.getItem('userToken')) : {};
const {
  id: tokenId,
  username: tokenUsername,
  email: tokenEmail,
  avatar: tokenAvatar,
} = parsedToken;

const initialState = {
  currentUserName: tokenUsername || '',
  currentUserEmail: tokenEmail || '',
  currentUserId: tokenId || null,
  currentUserAvatar: tokenAvatar ? `${process.env.REACT_APP_URL_IMAGE}/${tokenAvatar}` : null,
  selectedUser: {},
  isLoggedIn: localStorageToken !== null,
  token: localStorageToken !== null ? parsedToken : null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN_USER_SUCCESS': {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case 'SET_CURRENT_USER': {
      const {
        email, username, id, token, avatar,
      } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        currentUserEmail: email,
        currentUserName: username,
        currentUserAvatar: avatar ? `${process.env.REACT_APP_URL_IMAGE}/${avatar}` : null,
        currentUserId: id,
      };
    }
    case 'FETCH_USER_DATA_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        selectedUser: {
          ...data,
          avatar: data.avatar ? `${process.env.REACT_APP_URL_IMAGE}/${data.avatar}` : null,
        },
      };
    }
    case 'SET_USER_TOKEN': {
      return {
        ...state,
        token: action.payload,
      };
    }
    case 'ADD_AVATAR_SUCCESS': {
      return {
        ...state,
        currentUserAvatar: `${process.env.REACT_APP_URL_IMAGE}/${action.payload}`,
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
