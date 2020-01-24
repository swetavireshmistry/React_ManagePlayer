import {REGISTER_SUCCESSFUL,INVALID_REGISTER} from '../../../action/type'
const INITIAL_STATE={
    username:"",
    error_msg:""
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case REGISTER_SUCCESSFUL:{
            return Object.assign({},state,{username:action.data.username})
        }
        case INVALID_REGISTER:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}