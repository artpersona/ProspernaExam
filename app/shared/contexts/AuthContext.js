import React, {createContext, useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  // States
  const [initializing, setInitializing] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  //   End States

  // Functions

  // console.log('Logged User: ', loggedUser);

  const onAuthStateChanged = user => {
    // console.log('User: ', user.uid);
    // alert('User State Changed');
    if (user && loggedUser === null) {
      getProfile(user.uid);
    }
    // else setLoggedUser(null);
    if (initializing) setInitializing(false);
  };

  const loginViaEmail = (email, password) => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          console.log('Logged In: ', data.user.uid);
          getProfile(data.user.uid);
          // resolve();
        })
        .catch(err => {
          console.log('err is: ', err);
          alert('Error: ' + err.message);
          reject(err);
        });
    });
  };

  const getProfile = id => {
    const reference = firebase
      .app()
      .database(
        'https://prosperna-dd4dd-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/users/${id}`);

    reference.on(
      'value',
      snapshot => {
        setLoggedUser(snapshot.val());
      },
      err => {
        console.log('Error: ', err);
      },
    );
  };

  const logout = async () => {
    auth()
      .signOut()
      .then(() => setLoggedUser(null));
  };

  //   End Functions

  // Effects
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; //
  }, []);

  const payload = {
    logout,
    loggedUser,
    loginViaEmail,
  };
  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
