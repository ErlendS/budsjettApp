
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCvgJaHBHLuE7E2Ilu30q4X2u-IWPartck",
  authDomain: "budsjettapp-3c23e.firebaseapp.com",
  databaseURL: "https://budsjettapp-3c23e.firebaseio.com",
  projectId: "budsjettapp-3c23e",
  storageBucket: "budsjettapp-3c23e.appspot.com",
  messagingSenderId: "825601825605"
};
let fire = firebase.initializeApp(config);

  export default fire;