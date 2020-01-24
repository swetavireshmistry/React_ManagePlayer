import {VIEW_SUCCESSFULL,VIEW_ERROR,DELETE_USER_SUCCESSFULL,DELETE_ERROR,UPDATE_USER_SUCCESSFULL,UPDATE_ERROR,SEARCH_SUCCESSFULL,SEARCH_NOTFOUND} from '../../../action/type'
const INITIAL_STATE={
    Data:[],
    total_record:"",
    current_page:1,
    limit:"",
    editing:"",
    error_msg:""
}

export default(state=INITIAL_STATE,action)=>{
 
    switch(action.type)
    {
        case VIEW_SUCCESSFULL:{
            return Object.assign({},state,{Data:action.data.Data,total_record:action.data.total_record,
                current_page:action.data.current_page,limit:action.data.limit,editing:false})
        }
        case VIEW_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        case DELETE_USER_SUCCESSFULL:{
            return {Data:state.Data.filter(value=>value._id!==action.data.Data._id),total_record:state.total_record,
                current_page:state.current_page,
                limit:state.limit}
        }
        case DELETE_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        case UPDATE_USER_SUCCESSFULL:{
            return {Data:state.Data.map((value)=>{
                if(value._id===action.data.Data._id)
                    return action.data.Data
                else
                    return value
            }),total_record:state.total_record,
            current_page:state.current_page,
            limit:state.limit}
        }
        case UPDATE_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        case SEARCH_SUCCESSFULL:{
            return Object.assign({},state,{Data:action.data.Data,total_record:action.data.total_record,
                current_page:action.data.current_page,limit:action.data.limit,editing:false})
        }
        case SEARCH_NOTFOUND:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        default:
            return state;
    }
}