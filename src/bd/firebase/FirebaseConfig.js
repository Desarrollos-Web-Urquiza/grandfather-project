import * as firebase from 'firebase'; 
// import 'firebase/firestore';
 const config = {
    apiKey: 'AIzaSyCZnYsoQvXxt9A84Pmz2r2eZry2L8sZj0Y',
	authDomain: 'prueba-d4545.firebaseapp.com',
	projectId: 'prueba-d4545'
};
firebase.initializeApp(config);
console.disableYellowBox = ['Remote Debugger'];

export const firestore = firebase.firestore();