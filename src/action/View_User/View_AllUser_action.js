import {VIEW_SUCCESSFULL,VIEW_ERROR,VIEW_SELECTEDUSER_SUCCESSFULL,VIEW_SELECTUSER_ERROR,SEARCH_SUCCESSFULL,SEARCH_NOTFOUND} from '../type'

import * as View_AllUserService from '../../service/services'

export const View_AllUser=(credentials)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_AllUserService.View_AllUser(credentials)
            .then((response)=>{
                if(response.status===200)
                {
                    dispatch({
                        type:VIEW_SUCCESSFULL,
                        data:{Data:response.data.player,total_record:response.data.tot_record,
                        current_page:response.data.current_Page,
                        limit:response.data.limit}
                    })
                }
                return resolve(response.data);
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:VIEW_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}
export const View_SelectedUser=(credentials)=>{
    return(dispatch)=>{
      
        return new Promise((resolve,reject)=>{
            View_AllUserService.View_SelectedUser(credentials)
            .then((response)=>{
                if(response.status===200)
                {
                    dispatch({
                        type:VIEW_SELECTEDUSER_SUCCESSFULL,
                        data:response.data
                    })
                }
                return resolve(response.data);
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:VIEW_SELECTUSER_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}
export const Search_Record=(credentials)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_AllUserService.Search_Text(credentials)
            .then((response)=>{
                if(response.status===200)
                {
                    dispatch({
                        type:SEARCH_SUCCESSFULL,
                        data:{Data:response.data.player,total_record:response.data.tot_record,
                        current_page:response.data.current_Page,
                        limit:response.data.limit}
                    })
                }
                return resolve(response.data);
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:SEARCH_NOTFOUND,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}