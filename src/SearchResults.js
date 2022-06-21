import {Link,useLocation} from 'react-router-dom'
import classes from './styles/NavBar.module.css'
function SearchResults() {

    var location = useLocation();
    var collection=location.state.users

    return(
        
            <div className="container my-5">
            <div className="row d-flex align-items-center">
                <div className="col-12 offset-lg-3 col-lg-6 rounded bg-white py-3">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>Results</h1>
                        </div>
                    </div>
                    
                    {collection==-1 && 
                    <>
                        <p className="d-block m-auto my-5 text-center" style={{color:'grey'}}><i>No such users found...</i></p>
                    </>
                    }
                    
                    {collection!=-1 && collection.map(item=> 
                        <div className="row mt-5">
                            <Link to={`/Codeial/user/${item._id}`} className={classes.noLink} style={{color:'black'}}>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="offset-1 col-2">
                                            <div className="resultIcon"></div>
                                        </div>
                                        <div className="col-9 d-flex align-items-center">
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </div>
                        )}
                    
                    
                </div>
            </div>
        </div>

        
    )


}
export default SearchResults