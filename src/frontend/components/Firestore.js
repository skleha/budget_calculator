import * as firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
  authDomain: "yardzen-demo.firebaseapp.com",
  databaseURL: "https://yardzen-demo.firebaseio.com",
  projectId: "yardzen-demo",
  storageBucket: "yardzen-demo.appspot.com",
  messagingSenderId: "509183652730",
  appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
