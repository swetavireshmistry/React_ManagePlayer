import {DELETE_USER_SUCCESSFULL,DELETE_ERROR} from '../type'
import * as Delete_userservice from '../../service/services'


export const Delete_User=(credentials)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            Delete_userservice.Delete_User(credentials)
            .then((response)=>{
                if(response.status===200){
                    dispatch({
                        type:DELETE_USER_SUCCESSFULL,
                        data:{Data:response.data}
                    })
                }
                return resolve(response.data);
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:DELETE_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}
