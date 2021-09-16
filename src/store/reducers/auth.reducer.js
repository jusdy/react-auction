import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
  loggedIn: true, user, loggingIn: false, error: ''
} : {loggedIn: false, user: null, loggingIn: false, error: ''};

export function authentication(state = initialState, {type, payload}) {
  switch (type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: payload,
        error: ''
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        user: payload,
        error: ''
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        error: payload
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: ''
      };
    case userConstants.SIGNUP_REQUEST:
      return {
        ...state,
        singingUp: true,
        signedUp: false,
        error: ''
      }
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        singingUp: false,
        signedUp: true,
        error: ''
      }
    case userConstants.SIGNUP_FAILURE:
      return {
        ...state,
        singingUp: false,
        signedUp: false,
        error: payload
      }
    default:
      return state
  }
}

export const getLoggingInState = (state) => {
  return state.authentication.loggingIn;
}

export const getLoggedInState = (state) => {
  return state.authentication.loggedIn;
}


export const getSigningUpState = (state) => {
  return state.authentication.singingUp;
}

export const getSignedUpState = (state) => {
  return state.authentication.signedUp;
}

export const getError = (state) => {
  return state.authentication.error;
}