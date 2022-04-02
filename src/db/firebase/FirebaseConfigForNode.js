// // import * as firebase from 'firebase'; 
// // import 'firebase/firestore';
// //import firabse version 8
// import firebase from 'firebase/app'
// import 'firebase/firestore';
//  const config = {
//     apiKey: 'AIzaSyCZnYsoQvXxt9A84Pmz2r2eZry2L8sZj0Y',
// 	authDomain: 'prueba-d4545.firebaseapp.com',
// 	projectId: 'prueba-d4545'
// };
// // firebase.initializeApp(config);
// let app = firebase.initializeApp(config);
// // const db = firebase.firestore(app);

// export const db = firebase.firestore(app);
// // console.disableYellowBox = ['Remote Debugger'];

// // export const firestore = firebase.firestore();

const firebase = require('firebase-admin')
// const serviceAccount = require('../credentials.js')

let serviceAccount = { 
	"type": "service_account",
	"project_id": "prueba-d4545",
	"private_key_id": "5bd7e898306624e8348f09a39234617058b44663",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCrBQlH2ts9XSvp\nsL16EvDRzp+SGkGPdmzLvoo8Uu8b9IjbPl7/SoKbbFeH1jvkUmgk2gEAmIOer2rD\nzAmi+wLb9pNlvVg5Gr5K6Aym76YwfSqJRACBra7F4NF0S/a8txY0Dyv8Fui+CAJw\n2e+nQjOxjwNpc/ZPq7Ld/f2KlXpLqQDeJih5JPDGs6p8Bu+0hvhd9B1cCFzri232\nnUBT0Rxa0PTG6XdAHE5OW7BaA9RqyOULsvt6re9moo1YWYSbrk3toOCuUkS9SiCR\nyozarBDceGGhYvt/Gj7WDIENoTxqalDGZdUEmpO++L6k+Rt8k76wvKf+pkmkuLJT\nYd+a3xidAgMBAAECggEAOp2+yRSPyXAKUY4k21brmJW/5qU+LExUTN8RZUytrMC7\nOZ4elFS3AEt5ktLQc1j1XhAkgM5FapnIN7TS5rwvBjJ04c2sk+IBMA5p67u/E+aK\nskKPA+OCQEtmrvwsZRFBuHUsx7oYaq23HHPuKr9LlYOlkTrQRQ1eAK2B/cJvCMgk\nVwLVXaCd1fubGaJkx7AuSBmEp5t7CyDx+UWn0kpz8/CbCEk0rDdze+pJUoa3wCC7\ne9jj8SX+hhStbWCi+qV5K8U/nem+O4zvNSe7yHxuSwMo/BO7NIHfgkCu4mLZx+rQ\nGDfTfudHpJSxgARS0krToW2cQw89VgAY5zp+KlbV9wKBgQDSSydiVM8lHXtHww2M\nMeH9bhn3zWqERANpfX1E51mkyu5hzQGoMaYk/9esHXyGJ0RYtAQjkRGK9YbnXiPB\nuUzsWLhWDjJjGQlQhO5rMBbRl/Vn2XPxaVMRgiipx9dQKw7u3jY+qjp0gLwlVP7d\ntE+ZjHkUmhLeZxjf3qCuwg58BwKBgQDQMKlxKwUBFoQWdsmY6if1PbStSo2zeKDG\nmnEhvAwVeKQDCUQA48d8hwd5waL9s6OwSXp0cOoDiMJ8UNvjUPgyXiXVqmrb7yae\ntmv3FeMJz8w9aZVGc3hSlofLFrNH//Ya2ntvpCqbo/XhiAdiN2lZyUCWbxJ/851L\nCTFu4ailOwKBgQCl8Eu5mfaC8QqQi+eq0sni8vhmw57jk8+ldDJfJrdkBAWrAtvl\n3ped5oxG8lWKfn2+CP6jGhvfrPKwq2ZHvXJnpXJ/5V/5No5VDTAdQKsg5GnvcnW8\n70FvNWfk4R6T0gZMkuf29th9if/s7W7Xfyq4nVIF4bY17OCB9uiQPey0DQKBgQDE\nRjxY3u/22J1q+E6ThZ5qTOR7w5/YJc+drZke7sSNsZEe86tTE2vM8RiRJ4dcm/Gk\nj4GNKa7V6idBQJItuvZjtfMBf4sDEnJciys6ZT4I0AmDlHkRVGeJpTUcuKgJJz2E\nj5pz5FfvKCL1n2Mmq4r9BQmJSeotCyWtylr6aHCwZQKBgHE1GysvXLlZPSAy4Xzj\nlW6sIc2yoELdeNyguSbL8BzYqDuzbpiK8Ai1khaHBq+ZaWsvA5Idq3VtOIfeNAIE\nd2ps21jktRMV1hZnfMAgASq2iFxod0XX8nICwpbcBPOJC5qbbKPlltidBMasmDs6\nbOprYs5jV7hDQcHuGa0eHfEC\n-----END PRIVATE KEY-----\n",
	"client_email": "firebase-adminsdk-93bvb@prueba-d4545.iam.gserviceaccount.com",
	"client_id": "110371532515841935364",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-93bvb%40prueba-d4545.iam.gserviceaccount.com" 
  }

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
})

const db = firebase.firestore()

module.exports = { firebase, db }
