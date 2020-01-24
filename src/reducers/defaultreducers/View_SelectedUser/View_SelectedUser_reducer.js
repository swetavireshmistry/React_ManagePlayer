import {VIEW_SELECTEDUSER_SUCCESSFULL,VIEW_SELECTUSER_ERROR} from '../../../action/type'
const INITIAL_STATE={
    Data:[],
    error_msg:""
}

export default(state=INITIAL_STATE,action)=>
{
    switch(action.type){
        case VIEW_SELECTEDUSER_SUCCESSFULL:{
            return Object.assign({},state,{Data:action.data})
        }
        case VIEW_SELECTUSER_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        default:
            return state;
    }
}