import { addPost } from "./api"
import {useToasts} from 'react-toast-notifications'
import {useState} from 'react'
import { usePosts } from "./providers/ProvidePost"
function CreatePost() {
    
    var [post,setPost] = useState("")
    var [addingPost,setaddingPost] = useState(false)
    var {addToast} = useToasts();
    var postsauth = usePosts()
    async function handlePostClick() {
        setaddingPost(true)
        if(!post) {
            return addToast('Please say something',{
                appearance:'error'
            })
        }
        var response = await addPost(post)

        if(response.success) {
            postsauth.updatePost(response.data.post)
            setPost('')
            addToast('Posted in your feed',{
                appearance:'success'
            })
        }
        else {
            addToast(response.error,{
                appearance:'error'
            })
        }
        setaddingPost(false)
    }


    return (

        <div className="row my-5">
            <div className="col-12 col-lg-5 offset-lg-2 my-3 rounded bg-white p-4">
                <textarea className="w-100 mb-3 createpostarea" 
                 placeholder="Type your thoughts"
                 value={post}
                 onChange={e=>(setPost(e.target.value))}>

                </textarea>
                <div className="w-100 py-4 border-top border-secondary d-flex justify-content-end">
                    <button type="button" 
                    onClick={handlePostClick} 
                    className="btn btn-success"
                    disabled={addingPost}>{addingPost?'Adding Post...':'Add Post'}</button>
                </div>
                
            </div>
        </div>
    )




}
export default CreatePost