const initialState = {
  news: [],
  loading: false,
  byId: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_START': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'FETCH_USER_NEWS_START': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'FETCH_NEWS_SUCCESS': {
      const { payload } = action;
      return {
        ...state,
        news: payload,
        loading: false,
      };
    }

    case 'FETCH_USER_NEWS_SUCCESS': {
      const { payload: { data, id } } = action;
      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          [id]: {
            news: data,
          },
        },
      };
    }

    default:
      return state;
  }
};
