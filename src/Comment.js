import PropTypes from 'prop-types'
import classes from './styles/Comment.module.css'
import {useToasts} from 'react-toast-notifications'
import {changeLike} from './api'
function Comment({comment}) {

    var {addToast} = useToasts();

    async function handleLike(id) {
        var response = await changeLike(id,'Comment')
        if(response.success) {
            if(response.data.deleted) {
                return addToast('Like removed successfully',{
                    appearance:'success'
                })
            }
            addToast('Comment Liked',{
                appearance:'success'
            })
        }
        else{
            addToast(response.message,{
                appearance:'error'
            })
        }
    }

    return (
        <div className="row my-2 mb-4">
            <div className="col-10 offset-1 rounded" style={{backgroundColor: 'rgba(211,211,211,0.5)'}}>
                <div className='row'>
                    <div className="col-2 d-flex py-2 justify-content-end align-items-center">
                        <div className="d-block commentIcon bgImage" style={{backgroundImage:'url(https://i.pinimg.com/originals/ec/1c/f8/ec1cf8ffeb83c160b8fcc11f9b556755.jpg)'}}></div>
                        </div>
                    <div className="col-8 d-flex py-3 align-items-center" >
                        <small><b className={classes.commentLayout}>{comment.user.name}</b></small>
                    </div>
                    <div className="col-2 py-2 d-flex align-items-center">
                        <small><i onClick={handleLike.bind(null,comment._id)} className="fa-regular fa-heart me-2 icon"></i>{comment.likes.length}</small>
                    </div>
                </div>
                <div className="row">
                    <div className='offset-2 col-8'>
                        <p className={classes.commentLayout}>{comment.content}</p>
                    </div>
                </div>
                                
            </div>
        </div>
    )

}
Comment.propTypes = {
    comment:PropTypes.object.isRequired
}
export default Comment