import { takeLatest, call, put } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';

import axiosInstance from './axios';

function* fetchNews() {
  try {
    const getNews = async () => axiosInstance.get('/news');
    const response = yield call(getNews);
    const responseData = response.data;
    yield put({ type: 'FETCH_NEWS_SUCCESS', payload: responseData });
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchUserNews(action) {
  try {
    const response = yield call(axiosInstance.get, `/news/user/${action.payload.id}`);
    const responseData = response.data;
    yield put({ type: 'FETCH_USER_NEWS_SUCCESS', payload: { data: responseData, id: action.payload.id } });
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchUserData(action) {
  try {
    const response = yield call(axiosInstance.get, `/users/${action.payload.id}`);
    const responseData = response.data;
    yield put({ type: 'FETCH_USER_DATA_SUCCESS', payload: { data: responseData } });
  } catch (error) {
    console.log('error', error);
  }
}

function* signin(action) {
  try {
    const signIn = async () => axiosInstance.post('/auth/signin', { ...action.payload });
    const response = yield call(signIn);
    const responseData = response.data;
    const [, responseToken] = responseData.token.split(' ');
    const decodedToken = jwt.decode(responseToken);
    const {
      email,
      username,
      id,
      avatar,
    } = decodedToken;
    localStorage.setItem('userToken', responseToken);
    yield put({ type: 'SIGNIN_USER_SUCCESS' });
    yield put({
      type: 'SET_CURRENT_USER',
      payload: {
        email,
        username,
        id,
        avatar,
      },
    });
    yield put({ type: 'SHOW_MODAL_SIGN_IN', payload: false });
    yield put({ type: 'FETCH_NEWS_START' });
  } catch (error) {
    console.log('error', error);
  }
}
function* signup(action) {
  try {
    const { email, password } = action.payload;
    const signUp = async () => axiosInstance.post('/auth/signup', { ...action.payload });
    yield call(signUp);
    yield put({ type: 'SIGNIN_USER', payload: { email, password } });
    yield put({ type: 'SHOW_MODAL_SIGN_UP', payload: false });
  } catch (error) {
    console.log('error', error);
  }
}

function* addNews(action) {
  try {
    const formData = new FormData();
    Object.entries(action.payload).forEach(([key, value]) => formData.append(key, value));
    const addNewsRequest = async () => axiosInstance.post('/news', formData);
    yield call(addNewsRequest);
    yield put({ type: 'SHOW_MODAL_ADD_NEWS', payload: false });
    yield put({ type: 'FETCH_NEWS_START' });
  } catch (error) {
    console.log('error', error);
  }
}

function* editUser(action) {
  try {
    const addNewsRequest = async () => axiosInstance.put(`/users/edit/${action.payload.id}`, { ...action.payload });
    yield call(addNewsRequest);
    yield put({ type: 'SIGNIN_USER', payload: { ...action.payload } });
    yield put({ type: 'SHOW_MODAL_EDIT_USER', payload: false });
    yield put({ type: 'FETCH_NEWS_START' });
  } catch (error) {
    console.log('error', error);
  }
}

function* addAvatar(action) {
  try {
    const formData = new FormData();
    formData.append('avatar', action.payload.image);
    const addAvatarRequest = async () => axiosInstance.post(`/users/avatar/${action.payload.userId}`, formData);
    const response = yield call(addAvatarRequest);
    const responseData = response.data;
    const [, responseToken] = responseData.token.split(' ');
    localStorage.setItem('userToken', responseToken);
    const { avatar } = jwt.decode(responseToken);
    yield put({ type: 'ADD_AVATAR_SUCCESS', payload: avatar });
    yield put({ type: 'SHOW_MODAL_ADD_AVATAR', payload: false });
  } catch (error) {
    console.log('error', error);
  }
}

function* mySaga() {
  yield takeLatest('FETCH_NEWS_START', fetchNews);
  yield takeLatest('FETCH_USER_NEWS_START', fetchUserNews);
  yield takeLatest('FETCH_USER_DATA', fetchUserData);
  yield takeLatest('SIGNIN_USER', signin);
  yield takeLatest('SIGNUP_USER', signup);
  yield takeLatest('ADD_NEWS', addNews);
  yield takeLatest('ADD_AVATAR', addAvatar);
  yield takeLatest('EDIT_USER', editUser);
}

export default mySaga;
