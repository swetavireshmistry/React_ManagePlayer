import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import * as AuthAction from '../action/Login/Login_action'

class CRoute extends React.Component{
    check_auth=()=>{
        setTimeout(() => {
            this.props.action.auth.Logout_User();
        }, 50000);
    }
    getExtractJson({component,cprivate,action,auth,...rest}){
        return rest;
    }
    render(){
        this.check_auth();
        const rest=this.getExtractJson(this.props);
        const isUserLoggedIn=this.props.auth.token?this.props.auth.token!="":false
        const{component,cprivate}=this.props;
        const Component=component;

        let redirectTo=undefined
        var role=undefined;
        if(isUserLoggedIn)
            role=this.props.auth.userrole;
            
        if(isUserLoggedIn && rest.path==="/Login" && role=="Admin")
            redirectTo="/View_All_User"
        else if(isUserLoggedIn && rest.path=="/" && role=="User")
            redirectTo="/UserHomePage"
        else if(isUserLoggedIn && (rest.path==="/Login" || rest.path==="/Registration") && role=="User")
            redirectTo="/UserHomePage"
        else if(isUserLoggedIn && rest.path==="/View_All_User" && role==="User")
            redirectTo="/UnauthorizedAccess"
        else if(!isUserLoggedIn && cprivate)
            redirectTo = "/Login";
       
       // debugger 
        return(
          <Route
              {...rest}
              render={props=>(
                  (redirectTo)
                  ?<Redirect to={{pathname:redirectTo,state:{from:props.location}}}></Redirect>
                  :<Component {...props}/>
              )}>
          </Route> 
        );
    }
}
const mapStateToProps=(state)=>{
    const{auth}=state;
    return{
        auth:auth
    }
};
const mapDispatchToProps=dispatch=>({
    action:{
        auth:bindActionCreators(AuthAction,dispatch)
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(CRoute)