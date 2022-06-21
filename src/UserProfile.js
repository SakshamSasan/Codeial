import { useEffect, useState } from 'react';
import { useAuth } from './providers/ProvideAuth';
import { useToasts } from 'react-toast-notifications';
import classes from './styles/Settings.module.css'
import { useParams } from 'react-router-dom';
import { addFriend, removeFriend, userProfile } from './api';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

function UserProfile() {

    let [user,setUser] = useState({})
    let [loading,setLoading] = useState(true)  
    let {userId} = useParams();
    let [updateStatus,setUpdatestatus] = useState(false)
    let {addToast} = useToasts();
    let auth = useAuth()
    useEffect(()=>{

        async function fetchUserProfile(){
            let response = await userProfile(userId);
            if(response.success) {
                setUser(response.data.user)
            }
            else {
                addToast(response.message,{
                    appearance:'error'
                })
                return <Navigate to="/Codeial"/>

            }
        }
        fetchUserProfile()
        setLoading(false)

    },[userId])

    function checkIfFriend() {
        let ans = false
        
        if(auth.user.friendships) {
            auth.user.friendships.forEach(item=>{
                
                if(item.to_user._id==userId){
                    ans = true
                }
            })
            
            
        }
    
        return ans
    }

    async function addFriendClick(){

        setUpdatestatus(true)
        var response = await addFriend(userId)
        if(response.success) {
            let ans = response.data;
            auth.updateFriend(true,ans)
            addToast('Friend added successfully',{
                appearance:'success'
            })
        }
        else {
            addToast(response.message,{
                appearance:'error'
            })
        
        }


        setUpdatestatus(false)
    }

    async function removeFriendClick() {

        setUpdatestatus(true)
        var response = await removeFriend(userId)
        if(response.success) {
            
            const friendtoremove = auth.user.friendships.filter(friend=>friend.to_user._id==userId)
            auth.updateFriend(false,friendtoremove[0])
            addToast('Friend removed successfully',{
                appearance:'success'
            })
        }
        else{
            addToast(response.message,{
                appearance:'error'
            })
        }

        setUpdatestatus(false)

    }


    if(loading) {
        return <Loader />
    }

    return (
        <div className="container my-5">
            
            <div className="row d-flex align-items-center">
                <div className="col-12 offset-lg-3 col-lg-6 rounded bg-white py-3">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <div className={`bgImage ${classes.avatar}`}></div>
                        </div>
                    </div>
                    <div className="row mt-5 px-5">
                        <div className="col-10">
                            <span className={classes.label}>Email:</span>
                            <br />
                            <big><b>{user?.email}</b></big>
                        </div>
                    </div>
                    <div className="row mt-5 px-5">
                        <div className="col-10">
                            <span className={classes.label}>Name:</span>
                            <br />
                            <big><b>{user?.name}</b></big>
                        </div>
                    </div>
                    {
                        checkIfFriend() ? (
                            <div className="row mt-5 ">
                        <div className="col-12 d-flex justify-content-center">
                        <button type="button" className="btn btn-danger" onClick={removeFriendClick} disabled={updateStatus}>{updateStatus?'Removing friend..':'Remove Friend'}</button>
                        </div>
                    </div>
                        ):(
                            <div className="row mt-5 ">
                        <div className="col-12 d-flex justify-content-center">
                        <button type="button" className="btn btn-success" onClick={addFriendClick} disabled={updateStatus}>{updateStatus?'Adding friend..':'Add Friend'}</button>
                        </div>
                    </div>
                        )
                    }
                    
                    
                    
                    
                    
                </div>
            </div>
        </div>
    )


}
export default UserProfile;