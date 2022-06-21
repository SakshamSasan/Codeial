import { useState } from "react";
import {useToasts} from 'react-toast-notifications'
import {useAuth} from './providers/ProvideAuth'
import {Link,Navigate} from 'react-router-dom'
function Login() {

    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [loggingIn,setLoggingIn]=useState(false)
    let {addToast} = useToasts()
    let auth = useAuth();
    
    async function handleSubmit(e){
        console.log(email,password)
        e.preventDefault();
        setLoggingIn(true)
        if(email==""||password==""){
            return addToast('Please enter both email and password',{
                appearance:'error'
            })
        }
        var response = await auth.login(email,password);
        if(response.success) {
            addToast(`Welcome back ${email}`,{
                appearance:'success'
            })
        }
        else{
            
            addToast(response.message,{
                appearance:'error'
            })
        }

        setLoggingIn(false)
        
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
                            <h1>Welcome Back !!</h1>
                        </div>
                    </div>
                    <div className="row mt-5">
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
                    <div className="row my-5">
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success w-75" disabled={loggingIn}>{loggingIn?'Logging in...':'Log In'}</button>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-12 d-flex justify-content-center">
                            <Link to="/Codeial/signup"><div>Don't have an account ? Register here</div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
        
    );

}
export default Login;