import 'firebase/auth';
import firebase from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig.json';

let _app: firebase.app.App | null = null;

export function getApp() {
  if (_app) return _app;
  if (firebase.apps.length > 0) {
    return (_app = firebase.app());
  } else {
    _app = firebase.initializeApp(firebaseConfig);
    return _app;
  }
}

export function getAuth() {
  return getApp().auth();
}

export async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const user = await firebase.auth().signInWithPopup(provider);
    return user;
  } catch (error) {
    console.error('login failed', error);
    return null;
  }
}

export async function logout() {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('login failed', error);
  }
}
