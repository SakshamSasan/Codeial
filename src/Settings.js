import { useState } from 'react';
import { useAuth } from './providers/ProvideAuth';
import { useToasts } from 'react-toast-notifications';
import classes from './styles/Settings.module.css'

function Settings() {

    let auth = useAuth()
    let [userName,setUserName]=useState(auth.user?.name)
    let [password,setPassword]=useState("")
    let [confirmPassword,setConfirmPassword]=useState("")
    let [update,setupdate] = useState(false)
    let [editProfile,seteditProfile]=useState(false)
    const {addToast} = useToasts();

    async function handleSubmit(){
        setupdate(true)
        //Have to put condition of all 3 coz API call needs all the field values
        if(!userName||!password||!confirmPassword) {
            setupdate(false)
            return addToast('Please enter all 3 fields correctly',{
                appearance:'error'
            })
        }
        if(password!=confirmPassword) {
            setupdate(false)
            return addToast('Please match both password fields correctly',{
                appearance:'error'
            }) 
        }
        var response = auth.update(auth.user._id,userName,password,confirmPassword)
        if(response.success) {
            seteditProfile(false)
            setupdate(false)
            return addToast('User updated successfully',{
                appearance:'success'
            })
        }
        else {
            setupdate(false)
            return addToast(response.message,{
                appearance:'error'
            })
        }

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
                            <big><b>{auth.user?.email}</b></big>
                        </div>
                    </div>
                    
                    {editProfile?(
                        <>
                            <div className="row mt-3 px-5">
                        <div className="col-10 ">
                            <input 
                            type="text"  
                            style={{backgroundColor: 'rgba(211,211,211,0.4)'}} className="w-100 p-2 rounded border border-dark" value={userName} onChange={(e)=>{setUserName(e.target.value)}}
                            />
                        </div>
                    </div>
                            <div className="row mt-3 px-5">
                        <div className="col-10 ">
                            <input 
                            type="password"  
                            style={{backgroundColor: 'rgba(211,211,211,0.4)'}} className="w-100 p-2 rounded border border-dark" 
                            placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 px-5">
                        <div className="col-10 d-flex">
                            <input 
                            type="password"  
                            style={{backgroundColor: 'rgba(211,211,211,0.4)'}} className="w-100 p-2 rounded border border-dark" 
                            placeholder="Confirm Password" value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row my-5 px-5 d-flex">
                        <div className="col-3 ">
                            <button type="button" className="btn btn-success" onClick={handleSubmit} disabled={update}>{update?'Saving..':'Save'}</button>
                        </div>
                        <div className="offset-6 col-2 ">
                            <button type="button" className="btn btn-danger" onClick={()=>{seteditProfile(false)}}>Cancel</button>
                        </div>
                    </div>
                        </>
                    ):(
                        <>
                            <div className="row mt-3 px-5">
                        <div className="col-10">
                            <span className={classes.label}>Name:</span>
                            <br />
                            <big><b>{auth.user?.name}</b></big>
                        </div>
                    </div>
                           <div className="row my-5 px-5 d-flex justify-content-between">
                                <div className="col-4 ">
                                    <button type="submit" className="btn btn-warning" onClick={()=>{seteditProfile(true)}}>Edit Profile</button>
                                </div>
                            </div> 
                        </>
                    )
                    }
                    
                    
                    
                </div>
            </div>
        </div>
    )


}
export default Settings;