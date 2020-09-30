import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDPAKj7gEbNgC_z1EeQJOgyi8XmYzjzIoo",
    authDomain: "cell-balance-refill.firebaseapp.com",
    databaseURL: "https://cell-balance-refill.firebaseio.com",
    projectId: "cell-balance-refill",
    storageBucket: "cell-balance-refill.appspot.com",
    messagingSenderId: "644045247068",
    appId: "1:644045247068:web:bfcc7088d99a47268ecc99",
    measurementId: "G-T9RG400JED"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// database.ref('availableProviders').set(["MTS", "Beeline", "Megafone"]);
// database.ref('users').set({
//     "adonmez": {
//         password: "pass",
//         balances: {
//             "MTS": 0,
//             "Beeline": 12,
//             "Megafone": 50,
//         }
//     },
//     "testuser": {
//         password: "password",
//         balances: {
//             "MTS": 0,
//             "Beeline": 0,
//             "Megafone": 0,
//         }
//     },
//     "anotheruser": {
//         password: "abc123",
//         balances: {
//             "MTS": 0,
//             "Beeline": 0,
//             "Megafone": 0,
//         }
//     }
// });

export default database;
