import axios from "axios"

//axios configuration
export const commonAPI = async (httpMethod,url,reqBody)=>{
    let reqConfig = {
        method: httpMethod,
        url: url,
        data: reqBody,
        Headers: {
            "Content-Type":"application/json", //application/json indicates  the data we are going to upload is already in internet

        }
    }
    //axios call
    return await axios(reqConfig).then((result)=>{ //positive response returns in .then
        return result
    }).catch((err)=>{                 //reject in catch
        return err
    })
}