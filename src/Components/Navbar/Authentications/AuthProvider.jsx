/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { app } from "../../../../firebase.config";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, } from "firebase/auth";


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app)

    // login with google 
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    // sign out user 
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        signOutUser,
        googleLogin,
        user,
        loading,
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false) ;
            // console.log("current user : ", currentUser);
        })
        return () => unSubscribe();
    }, [auth])


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;