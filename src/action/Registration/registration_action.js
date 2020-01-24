import {REGISTER_SUCCESSFUL,INVALID_REGISTER} from '../type'

import * as Registration_service from '../../service/services'

export const Regitration_User=(credentials)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            Registration_service.Registration_User(credentials)
            .then((response)=>{
                if(response.status===200){
                    dispatch({
                        type:REGISTER_SUCCESSFUL,
                        data:{username:response.data.username}
                    });
                    return resolve(response.data);
                }
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:INVALID_REGISTER,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
};