import {applyMiddleware,compose,createStore} from 'redux'
import thunk from 'redux-thunk'

import rootreducer from '../reducers/index'

const composeEnhancer=
    typeof window==="object" && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;

const enhancer=composeEnhancer(
    applyMiddleware(thunk)
);

const token=localStorage.getItem("token");
const userrole=localStorage.getItem("userrole");

const INITIAL_STATE={
    auth:{
        token:"",
        userrole:"",
        error_msg:""
    }
}
if(token){
    INITIAL_STATE.auth.token=token;
    INITIAL_STATE.auth.userrole=userrole
}
export default createStore(rootreducer,INITIAL_STATE,enhancer);