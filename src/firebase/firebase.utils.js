import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyAvfFCh5DG66vJU9uARrgUXuJ7uL9jO7DA",
    authDomain: "crwn-db-7c5d2.firebaseapp.com",
    databaseURL: "https://crwn-db-7c5d2.firebaseio.com",
    projectId: "crwn-db-7c5d2",
    storageBucket: "crwn-db-7c5d2.appspot.com",
    messagingSenderId: "86205641117",
    appId: "1:86205641117:web:f8269a04a96fda8fda7f74",
    measurementId: "G-82CZ7R6562"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const{ displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData 
            })
        }catch(error){
            console.log('errror creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;