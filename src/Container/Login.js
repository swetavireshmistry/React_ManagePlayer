import React from 'react'
import { NavLink,Form, FormGroup, Input, Button, FormFeedback, ModalHeader, Modal, ModalBody, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { FaUser, FaLock } from 'react-icons/fa'
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Login_action from '../action/Login/Login_action'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            modal: true,
            errmsg: { username: "", password: "" }
        }
    }
    setData = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    validate = (event) => {
        var nm = event.target.name;
        var val = event.target.value;
        var err = { ...this.state.errmsg };
        err=this.CheckValidation(val,nm,err);
        this.setState({
            errmsg: err
        })
    }
    CheckValidation=(val,nm,err)=>{
        if (val === "") {
            if (nm === "username")
                err["username"] = "Username must be Required!!"
            if (nm === "password")
                err["password"] = "Password must be required!!"
        }
        else {
            err[nm] = ""
        }
        if (val !== "" && nm === "username") {
            if (!/^[a-zA-Z ]+$/.test(val))
                err["username"] = "Username contain must be alphabet"
        }
        if (val !== "" && nm === "password") {
            if (val.length < 8)
                err["password"] = "password must be 8 character long"
            else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[*+_#^!@$%])/.test(val))
                err["password"] = "password contain must be any deigit and special character";
        }
        return err;
    }
    btnlogin = (e) => {
        e.preventDefault();
        if(this.state.username=="" || this.state.password==""){
            var err={...this.state.errmsg};
            if(this.state.username=="")
            {
                err["username"]="Username must be required"
            }
            if(this.state.password=="")
            {
                err["password"]="Password must be required"
            }
            this.setState({
                errmsg:err
            })
        }
        else{
            this.props.action.auth.Login_User(
                    this.state
            ).then((data)=>{
                alert("login successfully")
                this.toggle()
            })
            .catch((error)=>{
                alert(error);
            })
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    render() {
        return (
            (this.state.modal)?
            <Modal isOpen={this.state.modal} className="shadow mb-2 bg-white rounded">
                <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }} style={{ backgroundColor: "#e0e0e0" }}><h2><b>Login</b></h2></ModalHeader>
                <ModalBody>
                    <div style={{ padding: "8%" }} className="grey-text">
                        <Form  onSubmit={this.btnlogin}>
                            <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <FaUser />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="username" invalid={this.state.errmsg.username ? true : false} placeholder="Your Playername..." onChange={this.setData} onBlur={this.validate}></Input>
                                <FormFeedback>{this.state.errmsg.username}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <FaLock />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="password" invalid={this.state.errmsg.password ? true : false} name="password" placeholder="Your Password..." onChange={this.setData} onBlur={this.validate}></Input>
                                <FormFeedback>{this.state.errmsg.password}</FormFeedback>
                            </InputGroup>

                        </FormGroup>
                        <p className="font-small grey-text d-flex justify-content-end">Forgot
                            <a href="#!" className="dark-grey-text font-weight-bold ml-1">Password?</a>
                        </p>
                        <FormGroup>
                            <Button color="cyan" type="submit" className="shadow p-3 mb-5 bg-white rounded" block>Login</Button>
                        </FormGroup>
                        <p className="font-small grey-text d-flex justify-content-center">Don't have an account?
                            <NavLink tag={Link} to="/Registration" className="dark-grey-text font-weight-bold ml-1">SignUp</NavLink>
                         </p>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>:(<Redirect to="/" />)
        )
    }
}
const mapStateToProps=(state)=>{
    const{auth}=state
    return{
        auth:auth
    }
}
const mapDispatchToProps=dispatch=>({
    action:{
        auth:bindActionCreators(Login_action,dispatch)
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Login)