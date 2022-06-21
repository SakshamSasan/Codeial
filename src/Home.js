import React, { useState,useEffect, useRef } from 'react';
import Comment from './Comment';
import Loader from './Loader'
import { Link } from 'react-router-dom';
import classes from './styles/NavBar.module.css'
import FriendList from './FriendList';
import CreatePost from './CreatePost';
import { useAuth } from './providers/ProvideAuth';
import { usePosts } from './providers/ProvidePost';
import { addComment, changeLike } from './api';
import {useToasts} from 'react-toast-notifications'
function Home() {

    
    var [comment,setComment] = useState("")
    var [postingcomment,setPostingComment]=useState(false)
    var {addToast} = useToasts()
    var auth=useAuth()
    var provideposts=usePosts()

    async function handleComment(postId) {
       
        setPostingComment(true)
        if(!comment) {
            setPostingComment(false)
            return addToast('Please type something',{
                appearance:'error'
            })
        }
        console.log(postId,provideposts.posts)
        var response = await addComment(postId,comment)
        console.log(response,provideposts.posts)
        if(response.success) {
            provideposts.postcomment(response.data.comment.post,response.data.comment)
            setComment('')
            addToast('Comment has been posted',{
                appearance:'success'
            })
        }
        else {
            addToast(response.message,{
                appearance:'error'
            })
        }
        setPostingComment(false)
    }

    async function handleLike(id) {

        var response = await changeLike(id,'Post')
        if(response.success) {
            if(response.data.deleted) {
                return addToast('Like removed successfully',{
                    appearance:'success'
                })
            }
            addToast('Post Liked',{
                appearance:'success'
            })
        }
        else{
            addToast(response.message,{
                appearance:'error'
            })
        }

    }
    
    if(provideposts.loading){
        return <Loader />
    }    
    return (
        <>
            <div className='container my-5'>
                <CreatePost />
                <div className="row my-5" >
                
                    <div className='col-12 col-lg-5 offset-lg-2 my-3' >
                    {provideposts.posts.map(item=>
                        
                        <div key={`post-${item._id}`} className="my-3 rounded bg-white p-4">
                 
                        <div className='row'>
                            <div className="col-2 py-3 ">
                                <div className="d-block postIcon m-auto bgImage" style={{backgroundImage:'url(https://i.cbc.ca/1.6413887.1649449379!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/kartik-vasudev.jpg)'}}></div>
                            </div>
                            <div className="col-7 py-2 py-md-3">
                                <div className="d-block">
                                    <Link className={classes.noLink} to={`/Codeial/user/${item.user._id}`}><b>{item.user.name}</b></Link>
                                </div>
                                <div className="d-block">
                                    50 mins ago
                                </div>
                            </div>
                        </div>
                        <div className="row px-3 mt-4 mb-4">
                            <div className='col-12'>
                            {item.content}
                            </div>
                        </div>
                        <div className="row px-3 my-3">
                            <div className='col-12 d-flex justify-content-start'>
                                <div className="me-4">
                                    <i 
                                    className="fa-regular fa-heart me-2 icon"
                                    style={{cursor:'pointer'}}
                                    onClick={handleLike.bind(null,item._id)}></i>
                                    <span>{item.likes.length}</span>
                                </div>
                                <div>
                                    <i style={{color:'lightgreen'}}className="fa-solid fa-comment-dots icon me-2"></i>
                                    <span>{item.comments.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row border-top border-dark py-1">
                            <div className="col-12 d-flex justify-content-start">
                                <div className="inputContainer d-flex align-items-center">
                                <input type="text" 
                                className="p-2 h-75 w-100 rounded-pill" 
                                placeholder="Add a comment...." 
                                value={comment}
                                onChange={(e)=>{setComment(e.target.value)}}
                                />
                                </div>
                                <div className="d-flex align-items-center mx-3">
                    
                                    <button type="button" 
                                    className="d-block btn btn-outline-primary" 
                                    
                                    onClick={handleComment.bind(null,item._id)} 
                                    disabled={postingcomment}
                                    >{postingcomment? 'Posting..':'Post'}</button>
                                </div>
                                
                            </div>
                        </div>
                        {
                            item.comments.map(comment=>
                                <Comment comment={comment} key = {comment._id}/>
                            )
                        }
                        </div>
                        )}
                    </div>
                    
                
                
                <div className='col-12 col-lg-3 offset-lg-1 my-3'>
                    <div className="bg-white rounded p-4 my-3">
                        <h3> Friends</h3>
                        <div className={classes.friendscroll}>
                            <FriendList />
                        </div>
                    </div>

                </div>
            
               </div>
                
            </div>
        
        
        </>
    );



}


export default Home;