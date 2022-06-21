import { Link } from "react-router-dom"
import { useAuth } from "./providers/ProvideAuth"

function FriendList() {

    let auth=useAuth()

    return (
        <>
            <div className="row">
                {auth.user.friendships ? (
                    auth.user.friendships.map(item=>
                        <Link to={`/Codeial/user/${item.to_user._id}`} style={{textDecoration:'none', color:'black'}}>
                        <div className="col-12 my-3" key={item.to_user._id}>
                            <div className="row">
                            <div className="col-2 col-md-3 offset-1 offset-lg-0">
                                <div className='postIcon bgImage' style={{backgroundImage:'url(https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png)'}}>
                                </div>
                            </div>
                            <div className="col-5 ">
                                {item.to_user.name}
                            </div>
                            </div>
                        </div>
                        </Link>
                    )
                ):(
                    <div className="col-12 py-2 px-1">
                        No friends found. Connect with people!!
                    </div>
                )}
            </div>
        </>
    )

}
export default FriendList