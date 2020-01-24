import {LOGIN_SUCCESSFULL,INVALID_USER,LOGOUT} from '../../../action/type'
const INITIAL_STATE={
    token:"",
    userrole:"",
    error_msg:""
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case LOGIN_SUCCESSFULL:{
            return Object.assign({},state,{token:action.data.token,userrole:action.data.userrole})
        }
        case INVALID_USER:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        case LOGOUT:{
            return Object.assign({},state,{token:"",userrole:""})
        }
        default:
            return state;
    }
}