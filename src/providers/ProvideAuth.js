import { useCallback, useContext, useEffect, useState } from "react";
import jwt from 'jwt-decode'
import { AuthContext } from "./AuthProvider";
import {editProfile, fetchFriends, login as userLogin, register} from '../api/index'
import { deleteItemFromLocalStorage, getItemFromLocalStorage, setItemInLocalStorage, TokenKey } from "../utils";

export function useAuth() {

    return useContext(AuthContext)
}

export function useProvideAuth() {
    let [user,setUser]=useState(null);
    let [loading,setLoading]=useState(true)

    const initialfetch=useCallback(async()=>{
        const userToken = getItemFromLocalStorage(TokenKey);
            
            if(userToken) {
                const usert = jwt(userToken)
                var response = await fetchFriends();
                
                let friendships=[];
                if(response.success) {
                     friendships=response.data.friends
                    
                }
                setUser({
                    ...usert,
                    friendships
                })
            
            }
            
    },[user])
    useEffect(()=>{
        
        initialfetch();
        setLoading(false)
        
    },[initialfetch])

    const login=async (email,password)=>{
        var response = await userLogin(email,password)
        if(response.success) {
            setUser(response.data.user)
            setItemInLocalStorage(TokenKey,response.data.token?response.data.token:null)
            return {
                success:true
            }
        }
        else {
            return {
                success:false,
                message:response.message
            }
        }
    }

    const logout=(email,password)=>{
        setUser(null)
        deleteItemFromLocalStorage(TokenKey)
    }

    const signup=async(userName,email,password,confirmPassword)=>{
        var response = await register(userName,email,password,confirmPassword)
        if(response.success) {
            return {
                success:true
            }
        }
        else {
            return {
                success:false,
                message:response.message
            }
        }
    }

    const update=async(userId,userName,password,confirmPassword)=>{
        var response = await editProfile(userId,userName,password,confirmPassword)
        if(response.success) {
            setUser(response.data.user)
            setItemInLocalStorage(TokenKey,response.data.token?response.data.token:null)
            return {
                success:true
            }
        }
        else {
            return {
                success:false,
                message:response.message
            }
        }
    }

    const updateFriend=async(addfriend,friend)=>{
        
        if(addfriend) {
            setUser({
                ...user,
                friendships:[...user.friendships, friend.friendship]
            })
          
        }
        else {
            let newArr=[];
            newArr=user.friendships.filter(item=>
                item.to_user.id!=friend.to_user.id
            )
            setUser({
                ...user,
                friendships:newArr
            })
        }
    }


    return {
        user,
        login,
        logout,
        signup,
        updateFriend,
        loading
    }

}