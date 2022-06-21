
import { createContext } from "react";
import { useProvidePost } from "./ProvidePost";

var initial = {
    posts:[],
    updatePost:()=>{},
    postcomment:()=>{},
    loading:false
}

export var PostContext = createContext(initial)

export function PostProvider({children}){
    var postsprop=useProvidePost()
    return (
        <PostContext.Provider value={postsprop}>{children}</PostContext.Provider>
    )
}