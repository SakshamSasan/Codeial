import { useState } from "react";
import {useToasts} from 'react-toast-notifications'
import {useAuth} from './providers/ProvideAuth'
import {useNavigate,Navigate} from 'react-router-dom'

function Signup() {

    let [userName,setUserName]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [confirmPassword,setConfirmPassword]=useState("")
    let [signingUp,setSigningUp]=useState(false)
    let auth = useAuth();
    let {addToast} = useToasts()
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSigningUp(true)
        if(!email||!password||!confirmPassword) {
            setSigningUp(false)
            return addToast('Please fill all fields correctly',{
                appearance:'error'
            })
        }
        if(password!==confirmPassword) {
            setSigningUp(false)
            return addToast('Please ensure the passwords match',{
                appearance:'error'
            })
        }
        var response = await auth.signup(userName,email,password,confirmPassword)
        if(response.success) {
            navigate('/Codeial/login')
            return addToast('User created successfully. Now Log In',{
                appearance:'success'
            })
            return
        }
        else {
            setSigningUp(false)
            console.log(password,confirmPassword)
            addToast(`${response.message}`,{
                appearance:'error'
            })
            return
        }

    }
    if(auth.user) {
        return <Navigate to="/Codeial" />
     }
    return (
        <form onSubmit={handleSubmit}>
            <div className="container my-5">
            <div className="row d-flex align-items-center">
                <div className="col-12 offset-lg-3 col-lg-6 rounded bg-white py-3">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>Become a part of Codeial family !!</h1>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 d-flex justify-content-center">
                            <input 
                            type="text" 
                            style={{backgroundColor: 'rgba(211,211,211,0.4)'}} className="w-75 p-2 rounded border border-dark" 
                            placeholder="Username"
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 d-flex justify-content-center">
                            <input 
                            type="email" 
                            style={{backgroundColor: 'rgba(211,211,211,0.4)'}} className="w-75 p-2 rounded border border-dark" 
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 d-flex justify-content-center">
                            <input 
                            type="password"  
                            style={{backgroundColor: 'rgba(211,211,211,0.4)'}} className="w-75 p-2 rounded border border-dark" 
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 d-flex justify-content-center">
                            <input 
                            type="password"  
                            style={{backgroundColor: 'rgba(211,211,211,0.4)'}} className="w-75 p-2 rounded border border-dark" 
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success w-75" disabled={signingUp}>{signingUp?'Signing up...':'Sign up'}</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </form>

    );


}
export default Signup