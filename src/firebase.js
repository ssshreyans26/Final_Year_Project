import  firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDMkNURpq1veqWAcquRmTDBpGYYAAT2_I8",
    authDomain: "complaint-portal-66054.firebaseapp.com",
    projectId: "complaint-portal-66054",
    storageBucket: "complaint-portal-66054.appspot.com",
    messagingSenderId: "648037135866",
    appId: "1:648037135866:web:58a956923ff4b3a8926043",
    measurementId: "G-4Q5ZSWDVPY"
  };

  

  firebase.initializeApp(firebaseConfig);


  //CREATE NEW USER
  export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`admins/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

//GET USER DATA
export const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`admins/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
  
  export const auth = firebase.auth();
  
  export const firestore = firebase.firestore();


