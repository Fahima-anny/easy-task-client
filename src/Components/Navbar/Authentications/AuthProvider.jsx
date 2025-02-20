/* eslint-disable react/prop-types */

import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { app } from "../../../../firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";


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

    const authInfo = {
googleLogin,
user,
loading
    }

    const


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;