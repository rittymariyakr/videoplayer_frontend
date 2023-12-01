import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"




//upload video
export const uploadVideo = async (reqBody)=>{ //reqBody have the data from add.jsx (ie, user infput from input field)
    //return the response to Add.jsx component
    return await commonAPI('POST', `${serverURL}/videos`,reqBody )
}

//get all uploaded videos
export const getAllVideos = async()=>{
    //return the response to View.jsx Component
    return await commonAPI('GET',`${serverURL}/videos`,"")
}

//to delete a video
export const deleteAVideos = async(id)=>{ //deleting a video based on id. so give id as argument in this function
    return await commonAPI('DELETE', `${serverURL}/videos/${id}`,{}) //we are gonna delete an object so, give curly brakets
}

//add to watch history
export const addToHistory = async(videoDetails)=>{
    return await commonAPI('POST', `${serverURL}/history`,videoDetails)
}


//API to gethistory from json-server
export const getAllHistory = async()=>{
    return await commonAPI('GET',`${serverURL}/history`,"")
}

//api call to delete history
export const deleteVideoHistory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/history/${id}`, {})
}

//API to add category to json-server
export const addAllCategory = async(body)=>{
    return await commonAPI('POST', `${serverURL}/categories`,body)
}

//api to get all categories from json-server
export const getAllCategories = async()=>{
    return await commonAPI('GET',`${serverURL}/categories`,"")
}

//api to delete categories from json-server
export const deleteCategory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/categories/${id}`, {})
}

//api call to get a particular video from http://localhost:5000/videos
export const getAVideo = async(id)=>{
    return await commonAPI('GET',`${serverURL}/videos/${id}`,"")
}

//api to update the category with new videos
export const updateCategory = async(id,body)=>{
    return await commonAPI('PUT',`${serverURL}/categories/${id}`,body)
}


