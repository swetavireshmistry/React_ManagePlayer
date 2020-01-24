import {LOGIN_SUCCESSFULL,INVALID_USER,LOGOUT} from '../type'

import * as Login_service from '../../service/services'

export const Login_User=(credentials)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            Login_service.Login_User(credentials)
            .then((response)=>{
                if(response.status==200){
                    localStorage.setItem("token",response.data.token)
                    localStorage.setItem("userrole",response.data.userrole)
                    dispatch({
                        type:LOGIN_SUCCESSFULL,
                        data:{token:response.data.token,userrole:response.data.userrole}
                    });
                    return resolve(response.data);
                }
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:INVALID_USER,
                        data:{error_msg:error.response.data}
                    })
                    return reject(error.response.data);
                }
            })
        })
    }
}

export const Logout_User=()=>{
    return(dispatch)=>{
        dispatch({
            type:LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userrole");
    }
}