import {UPDATE_USER_SUCCESSFULL,UPDATE_ERROR} from '../type'
import * as Update_UserService from '../../service/services'

export const Update_User=(id,credentials)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            Update_UserService.Update_User(id,credentials)
            .then((response)=>{
                if(response.status===200){
                    dispatch({
                        type:UPDATE_USER_SUCCESSFULL,
                        data:{Data:response.data}
                    })
                }
                return resolve(response.data)
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:UPDATE_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}