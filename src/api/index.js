import {TokenKey,API_URLS, getFormBody} from '../utils/index'

let customFetch = async (url,{body, ...customConfig})=>{

    let token = window.localStorage.getItem(TokenKey);

    let headers = {
        'Content-Type':'application/x-www-form-urlencoded',
      
    }
    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    let config = {
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers,

        }
    }

    if(body) {
        config.body = getFormBody(body)

    }

    try{
        const response = await fetch(url,config)
        
        const data = await response.json()

        if(data.success) {
            return {
                data:data.data,
                success:true
            }
        }
        throw new Error(data.message)


    }
    catch(error){
        console.log(error)
        return {
            message:error.message,
            success:false
        }
    }
}

export const getPosts=(page=1,limit=5)=>{
    return customFetch(API_URLS.posts(page,limit),{
        method:'GET'
    })
}

export const login = (email,password)=>{
    return customFetch(API_URLS.login(),{
        method:'POST',
        body: {email,password}
    })
}

export const register = (userName,email,password,confirmPassword) => {
    return customFetch(API_URLS.signup(),{
        method:'POST',
        body:{
            name:userName,
            email,
            password,
            confirm_password:confirmPassword
        }
    })
}

export const editProfile = (userId,userName,password,confirmPassword) => {
    return customFetch(API_URLS.editUser(),{
        method:'POST',
        body:{
            id:userId,
            name:userName,
            password,
            confirm_password:confirmPassword
        }
    })
}

export const userProfile = (userId) => {
    return customFetch(API_URLS.userInfo(userId),{
        method:'GET'
    })
}

export const fetchFriends = () => {
    return customFetch(API_URLS.friends(),{
        method:'GET'
    })
}

export const addFriend = (userId) => {
    return customFetch(API_URLS.createFriendship(userId),{
        method:'POST'
    })
}

export const removeFriend = (userId) => {
    return customFetch(API_URLS.removeFriend(userId),{
        method:'POST'
    })
}

export const addPost = (content) => {
    return customFetch(API_URLS.createPost(),{
        method:'POST',
        body:{
            content
        }
    })
}

export const addComment = (postId,content) => {
    return customFetch(API_URLS.comment(),{
        method:'POST',
        body:{
            post_id:postId,
            content
        }
    })
}

export const changeLike = (itemId,item) => {
    return customFetch(API_URLS.toggleLike(itemId,item),{
        method:'POST'
    })
}

export const searchUsers = (text) => {
    return customFetch(API_URLS.searchUsers(text),{
        method:'GET'
    })
}