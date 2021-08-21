// import * as firebase from 'firebase'; 
// import 'firebase/firestore';
//import firabse version 8
import firebase from 'firebase/app'
import 'firebase/firestore';
 const config = {
    apiKey: 'AIzaSyCZnYsoQvXxt9A84Pmz2r2eZry2L8sZj0Y',
	authDomain: 'prueba-d4545.firebaseapp.com',
	projectId: 'prueba-d4545'
};
// firebase.initializeApp(config);
let app = firebase.initializeApp(config);
// const db = firebase.firestore(app);

export const db = firebase.firestore(app);
// console.disableYellowBox = ['Remote Debugger'];

// export const firestore = firebase.firestore();