import { useContext, useState,useEffect } from "react";
import { PostContext } from "./PostProvider";
import { getPosts } from "../api";
export function usePosts() {

    return useContext(PostContext)
}


export function useProvidePost() {
    var [posts,setPosts] = useState([])
    var [loading,setLoading] = useState(true)

    useEffect(()=>{
        //function to async fetch the posts
        async function fetchPosts(){

        var response = await getPosts();
        if(response.success){
            setPosts(response.data.posts)
        }
        else{
            return response.error
        }
        setLoading(false)
    }

        fetchPosts()
    },[])

   function updatePost(content) {
        setLoading(true)
        setPosts([content,...posts])
        setLoading(false)

    }

    function postcomment(postId,content) {
      
        let index=0
        for(let index in posts) {
            if(posts[index]._id==postId) {
                break;
            }
        }
        posts[index].comments.unshift(content)
        
        setPosts(posts)
    }

    return ({
        posts,
        updatePost,
        postcomment,
        loading
    })
}