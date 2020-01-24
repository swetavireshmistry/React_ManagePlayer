import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {Button} from 'reactstrap'

import * as View_Selected_User from '../action/View_User/View_AllUser_action'

const baseURL = "http://localhost:3032/Upload/"
var view_div={
    float:"left",
    width:"300px",
    backgroundColor:"pink",
    textAlign:"left",
    margin:"8px",
    padding:"8px"
}
class View_SelectUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Data:[]
        }
    }
    componentWillMount(){
        if(this.props.location.state!=undefined)
        {
            this.props.action.View_User.View_SelectedUser(this.props.location.state.IDData)
            .then((data)=>{
            })
            .catch((error)=>{
                if(error){
                    alert(error)
                }
            })
        }
    }
    DisplayData=()=>{
        const data=this.props.View_User.Data
        return data.map((value)=>{
            const{username,dob,role,bowlerstyle,batsmanstyle,team,profile}=value
            return(
                <div style={view_div}><div style={{textAlign:"center"}}><img src={baseURL+profile} width="100px" height="100px" class="rounded-circle"/></div><div><h5><b>UserName:</b>   {username}</h5></div>
                <div><h5><b>Role:</b>   {role}</h5></div><div><h5><b>DOB:</b>   {moment(dob).format('DD-MM-YYYY')}</h5></div><div><h5><b>Bowler Style:</b>   {bowlerstyle}</h5></div>
                <div><h5><b>Batsman Style:</b>   {batsmanstyle}</h5></div><div><h5><b>Team:</b>   {team}</h5></div></div>
            )
        })
    }
    goback=()=>{
        this.props.history.goBack()
    }
    render(){
        return(
            <div>
                {this.DisplayData()}
                <div><Button onClick={this.goback}>Back</Button></div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    const{View_Seleted_User}=state
    return{
        View_User:View_Seleted_User
    }
}
const mapDispatchToProps=dispatch=>({
    action:{
        View_User:bindActionCreators(View_Selected_User,dispatch)
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(View_SelectUser)