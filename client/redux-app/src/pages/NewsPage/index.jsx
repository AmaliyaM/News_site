import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import jwt from 'jsonwebtoken';

import NewsList from '../../components/NewsList';
import SearchPanel from '../../components/SearchPanel';
import SignIn from '../../components/SignInModal';
import SingUp from '../../components/SignUpModal';
import AddNewsModal from '../../components/AddNewsModal';

function MainPage() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ field: '', value: '' });
  const { isLoggedIn, currentUserName, token } = useSelector((state) => state.usersReducer);
  const { news, loading } = useSelector((
    { newsReducer },
  ) => newsReducer, shallowEqual);
  const showModal = useSelector((state) => state.utilsReducer.isModalAddNewsShown);
  const handleClick = () => {
    dispatch({ type: 'FETCH_NEWS_START' });
  };

  useEffect(() => {
    if (!news.length && isLoggedIn) dispatch({ type: 'FETCH_NEWS_START' });
  }, [isLoggedIn, news.length, dispatch]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <SearchPanel filterChange={setFilter} />
          <div>{ currentUserName }</div>
          <NewsList filter={filter} dataNews={news} />
          <button type="button" onClick={() => handleClick()}>Fetch news</button>
          {loading && <span>Loading...</span>}
          {showModal && <AddNewsModal />}
        </>
      ) : (
        <Typography variant="h5" component="h5" gutterBottom>
          Please, sign in to view news!
        </Typography>
      )}
      <SignIn />
      <SingUp />
    </>
  );
}

export default MainPage;
