const initialState = {
  isModalSignInShown: false,
  isModalSignUpShown: false,
  isModalAddNewsShown: false,
  isModalEditUserShown: false,
  isModalAddAvatarShown: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL_SIGN_IN': {
      return {
        ...state,
        isModalSignInShown: action.payload,
      };
    }
    case 'SHOW_MODAL_SIGN_UP': {
      return {
        ...state,
        isModalSignUpShown: action.payload,
      };
    }

    case 'SHOW_MODAL_ADD_NEWS': {
      return {
        ...state,
        isModalAddNewsShown: action.payload,
      };
    }
    case 'SHOW_MODAL_EDIT_USER': {
      return {
        ...state,
        isModalEditUserShown: action.payload,
      };
    }
    case 'SHOW_MODAL_ADD_AVATAR': {
      return {
        ...state,
        isModalAddAvatarShown: action.payload,
      };
    }
    default:
      return state;
  }
};
