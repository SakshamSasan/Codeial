import { createContext, useContext, useEffect, useState } from "react";
import { useProvideAuth } from "./ProvideAuth";
var initialState={
    user:null,
    login:()=>{},
    logout:()=>{},
    signup:()=>{},
    update:()=>{},
    updateFriend:()=>{},
    loading: true
}
export var AuthContext = createContext(initialState);

export function AuthProvider({children}){
    var auth = useProvideAuth()
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

