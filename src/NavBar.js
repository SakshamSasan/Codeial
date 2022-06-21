import classes from './styles/NavBar.module.css'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from './providers/ProvideAuth'
import { useEffect, useState } from 'react';
import {useToasts} from 'react-toast-notifications';
import { searchUsers } from './api';
function NavBar() {


    let [text,settext] = useState('')
    let {addToast} = useToasts()
    let auth = useAuth();
    let navigate = useNavigate();

    async function handleSearch(e) {
        e.preventDefault()
        var response = await searchUsers(text)
            if(response.success) {
                navigate('/results',{state:{users:response.data.users}})
            }
            else {
                navigate('/results',{state:{users:-1}})
            }
        
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'rgb(73,56,178)'}}>
        <div className="container-fluid">
            <a className="navbar-brand" href="#"><big><b>{"<codeial />"}</b></big></a>
            <div className="navbar-toggler navbarIcon me-3" type="div" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span ><i className="fa-solid fa-bars"></i></span>
            </div>
            
            <div className="collapse navbar-collapse custompos" id="navbarSupportedContent">
                <ul className={classes.navlist}>
                    
                    <li className="my-2 my-lg-0 me-lg-4">
                        <Link to="/Codeial" className={classes.noLink}><i style={{color:'white'}}className="fa-solid fa-house"></i></Link>
                    </li>

                    <li className="dropdown my-2 my-lg-0 me-lg-4">
                        <div style={{color:'white'}}className="dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown"  data-bs-toggle="dropdown" aria-expanded="false">
                            <div className={classes.userlogo} style={{backgroundImage:'url(https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg)'}}>
                            </div>
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className={`dropdown-item ${classes.noLink}`} to="/Codeial/settings">Your Profile</Link></li>
                            {
                                auth.user ?
                                (<li onClick={auth.logout}><Link className={`dropdown-item ${classes.noLink}`} to="/Codeial/login">Log Out</Link></li>):
                                (<li><Link className={`dropdown-item ${classes.noLink}`} to="/Codeial/login">Log In/Register</Link></li>)
                            }
                            
                            
                        </ul>
                    </li>

                    <li className="my-2 my-lg-0 me-lg-5">
                        <form>
                            <input className="p-1 me-2 rounded" 
                            type="search" 
                            placeholder=" Find People.." 
                            aria-label="Search" 
                            value = {text}
                            onChange = {(e)=>{settext(e.target.value)}}/>
                            
                            <button 
                            type="button"
                            className="btn btn-outline-success"
                            onClick={handleSearch}>Search</button>
                        </form>
                        
                    </li>

                    
                    
                    
                </ul>
                
            </div>
        </div>
        </nav>
    );
}
export default NavBar;