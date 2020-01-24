import React, { Component } from 'react'
import { NavLink, Form, FormGroup, Label, Input, Button, FormFeedback, Container, Col } from 'reactstrap'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import * as Register_action from '../action/Registration/registration_action'
import * as updateuser_action from '../action/View_User/Update_userAction'
const baseURL = "http://localhost:3032/Upload/"

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            role: [],
            bowlerstyle: "",
            batsmanstyle: "",
            dob: "",
            team: "",
            profile: "",
            conpwd: "",
            editing: false,
            errmsg: { username: "", role: "", dob: "", password: "", conpwd: "", team: "", profile: "", bowlerstyle: "", batsmanstyle: "" }
        }
    }
    componentWillMount() {
        if (this.props.location.state != undefined) {
            const editdata = this.props.location.state.Data
            if (editdata) {
                const { username, password, dob, role, bowlerstyle, batsmanstyle, profile, team } = editdata
                role.map((value) => {
                    this.setState({
                        role: value
                    })
                })
                this.setState({
                    username: username,
                    password: password,
                    conpwd: password,
                    dob: dob,
                    bowlerstyle: bowlerstyle,
                    batsmanstyle: batsmanstyle,
                    profile: profile,
                    team: team,
                    editing: this.props.location.state.editing
                })
            }
        }
    }
    setData = (event) => {
        var value = event.target.value;
        if (event.target.name == "role") {
            var check = [];
            var arr = document.getElementsByName("role");
            arr.forEach(element => {
                if (element.checked) {
                    check.push(element.value);
                }
                else {
                    if (element.value == "Bowler")
                        this.state.bowlerstyle = "";
                    if (element.value == "Batsman")
                        this.state.batsmanstyle = "";
                }
            })
            value = check;
        }
        if (event.target.name == "profile") {
            value = event.target.files;
        }
        this.setState({
            [event.target.name]: value
        })
    }
    validate = (event) => {
        var nm = event.target.name;
        var val = event.target.value;
        var err = { ...this.state.errmsg };
        if (val == "") {
            err = this.checkrequired(nm, err);
        }
        else {
            err[nm] = ""
        }
        if (val != "" && nm == "username") {
            if (!/^[a-zA-Z ]+$/.test(val))
                err["username"] = "Username contain must be alphabet"
        }
        if (val != "" && nm == "dob") {
            var age = new Date().getFullYear() - new Date(val).getFullYear()
            if (age < 18 || age > 50)
                err["dob"] = "Age must be greather then 18 and less then 50"
        }
        if (val != "" && nm == "password") {
            if (val.length < 8)
                err["password"] = "password must be 8 character long"
            else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[*+_#^!@$%])/.test(val))
                err["password"] = "password contain must be any deigit and special character";
        }
        if (val != "" && (nm == "bowlerstyle" || nm == "batsmanstyle")) {
            if (val != "LeftHand" && val != "RightHand")
                err[nm] = "Style must be LeftHand or RightHand"
        }
        if (val != "" && nm == "team") {
            if (val == -1)
                err[nm] = "Team must be select"
        }

        if (nm == "conpwd" && val != "") {
            if (this.state.password != val) {
                err[nm] = "Password and Confirm password must be same!!"
            }
        }
        this.setState({
            errmsg: err
        })
    }
    checkrequired = (nm, err) => {
        if (nm == "username" && this.state.username == "")
            err["username"] = "Username must be Required!!"
        if (nm == "password" && this.state.password == "")
            err["password"] = "Password must be required!!"
        if (nm == "conpwd" && this.state.conpwd == "")
            err[nm] = "Confirm Password must be required!!"
        if (nm == "dob" && this.state.dob == "")
            err["dob"] = "DOB must be Required!!"
        if (nm == "bowlerstyle" && this.state.bowlerstyle == "")
            err["bowlerstyle"] = "Bowler Style must be required!!";
        if (nm == "batsmanstyle" && this.state.batsmanstyle == "")
            err["batsmanstyle"] = "Batsman Style must be required!!";
        if (nm == "team" && this.state.team == "")
            err["team"] = "Team must be Required!!"
        if (nm == "profile" && this.state.profile == "")
            err["profile"] = "Profile must be Required!!"
        return err;
    }
    btn_registration = (e) => {
        e.preventDefault();
        if (this.state.username == "" || this.state.password == "" || this.state.conpwd == "" || this.state.role.length <= 0 || (this.state.role["Bowler"] && this.state.bowlerstyle == "") || (this.state.role["Batsman"] && this.state.batsmanstyle == "") || this.state.dob == "" || this.state.profile == "") {
            var err = { ...this.state.errmsg }
            for (var val in this.state.errmsg) {
                err = this.checkrequired(val, err);
            }
            if (this.state.role.length <= 0)
                err["role"] = "Role must be required!!"
            this.setState({
                errmsg: err
            })
        }
        else {
            var flag = false;
            for (var val in this.state.errmsg) {
                if (this.state.errmsg[val] != "")
                    flag = true
            }
            if (flag == false) {
                let fd = new FormData();
                fd.append("username", this.state.username)
                fd.append("password", this.state.password)
                fd.append("dob", this.state.dob)
                fd.append("role", this.state.role)
                fd.append("bowlerstyle", this.state.bowlerstyle)
                fd.append("batsmanstyle", this.state.batsmanstyle)
                fd.append("team", this.state.team)
                if (this.state.editing == true && this.props.location.state.Data.profile == this.state.profile) {
                    fd.append('profile', this.state.profile)
                }
                else {
                    for (var i of this.state.profile)
                        fd.append('profile', i);
                }
                this.state.editing ?
                    this.props.action.Update_user.Update_User(this.props.location.state.Data._id, fd)
                        .then((data) => {
                            this.props.history.replace("/View_All_User")
                        }).catch((error) => {
                            alert(error);
                        })
                    :
                    this.props.action.Registration.Regitration_User(fd)
                        .then((data) => {
                            alert("Registration Successfully");
                            this.props.history.push("/Login")
                        }).catch((error) => {
                            alert(error);
                        })
            }
        }
    }
    render() {
        console.log(this.state.errmsg)
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%"
            }}>
                <Container className="themed-container" fluid="sm" className="shadow bg-white rounded">
                    <p style={{ backgroundColor: "#e0e0e0", height: "50px" }}>
                        <h3><b> {this.state.editing ? "Update User" : "Registration"}</b></h3>

                    </p>
                    <Form onSubmit={this.btn_registration}>
                        <FormGroup row>
                            <Label sm={2} className="flex-role">Player Name:</Label>
                            <Col sm={10} >
                                <Input type="text" invalid={this.state.errmsg.username ? true : false} name="username" placeholder="Enter Plyername..." onChange={this.setData} onBlur={this.validate} value={this.state.username}></Input>
                                <FormFeedback>{this.state.errmsg.username}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} className="flex-role">Password:</Label>
                            <Col sm={10}>
                                <Input type="password" invalid={this.state.errmsg.password ? true : false} name="password" placeholder="Enter Password..." onChange={this.setData} onBlur={this.validate} value={this.state.password} disabled={this.state.editing} ></Input>
                                <FormFeedback>{this.state.errmsg.password}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} className="flex-role">Confirm Password:</Label>
                            <Col sm={10}>
                                <Input type="password" invalid={this.state.errmsg.conpwd ? true : false} name="conpwd" placeholder="Enter Confirm Password..." onChange={this.setData} onBlur={this.validate} value={this.state.conpwd} disabled={this.state.editing}></Input>
                                <FormFeedback>{this.state.errmsg.conpwd}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} className="flex-role">Born Date:</Label>
                            <Col sm={10}>
                                <Input type="date" invalid={this.state.errmsg.dob ? true : false} name="dob" max={moment().format('YYYY-MM-DD')} onChange={this.setData} onBlur={this.validate} value={moment(this.state.dob).format('YYYY-MM-DD')}></Input>
                                <FormFeedback>{this.state.errmsg.dob}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} className="flex-role">Role:</Label>
                            <Col sm={10}>
                                <FormGroup row>
                                    <Label sm={2}>
                                        <Input type="checkbox" name="role" value="Bowler" onChange={this.setData} onBlur={this.validate} checked={this.state.role.includes("Bowler") ? true : false}></Input>
                                        Bowler</Label>
                                    <Col sm={5}>
                                        <Label sm={8}>
                                            <Input type="checkbox" name="role" value="Batsman" onChange={this.setData} onBlur={this.validate} invalid={this.state.role.length <= 0 ? true : false} checked={this.state.role.includes("Batsman") ? true : false}></Input>
                                            Batsman
                                            {this.state.errmsg.role && <FormFeedback>{this.state.errmsg.role}</FormFeedback>}
                                        </Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        {this.state.role.includes("Bowler") && <Input type="text" invalid={this.state.errmsg.bowlerstyle ? true : false} name="bowlerstyle" placeholder="Enter Bowler Style...." onChange={this.setData} onBlur={this.validate} value={this.state.bowlerstyle} />}
                                        {this.state.errmsg.bowlerstyle && <FormFeedback>{this.state.errmsg.bowlerstyle}</FormFeedback>}
                                    </Col>
                                    <Col sm={5}>
                                        {this.state.role.includes("Batsman") && <Input type="text" invalid={this.state.errmsg.batsmanstyle ? true : false} name="batsmanstyle" placeholder="Enter Batsman Style...." onChange={this.setData} onBlur={this.validate} value={this.state.batsmanstyle} />}
                                        {this.state.errmsg.batsmanstyle && <FormFeedback>{this.state.errmsg.batsmanstyle}</FormFeedback>}
                                    </Col>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} className="flex-role">Profile:</Label>
                            <Col sm={10}>
                                <img src={this.state.editing && this.state.profile == this.props.location.state.Data.profile ? baseURL + this.state.profile : this.state.profile.length == 0 ? require("../assets/usericon.png") : URL.createObjectURL(this.state.profile[0])} width="80px" height="80px" />
                                <Input type="file" invalid={this.state.errmsg.profile ? true : false} name="profile" onChange={this.setData} onBlur={this.validate}></Input>
                                <FormFeedback>{this.state.errmsg.profile}</FormFeedback>
                            </Col>

                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} className="flex-role">Team:</Label>
                            <Col sm={10}>
                                <Input type="select" name="team" invalid={this.state.errmsg.team ? true : false} onChange={this.setData} onBlur={this.validate} value={this.state.team}>
                                    <option value="-1">---Select---</option>
                                    <option>Team 1</option>
                                    <option>Team 2</option>
                                    <option>Team 3</option>
                                </Input>
                                {this.state.errmsg.team && <FormFeedback>{this.state.errmsg.team}</FormFeedback>}
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button color="cyan" type="submit"> {this.state.editing ? "Update" : "Submit"} </Button>
                        </FormGroup>
                    </Form>
                    <p className="font-small grey-text d-flex justify-content-center">Do have an account?
                            <NavLink tag={Link} to="/Login" className="dark-grey-text font-weight-bold ml-1">SignIn</NavLink>
                    </p>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { Registration } = state;
    return {
        Registration: Registration
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        Registration: bindActionCreators(Register_action, dispatch),
        Update_user: bindActionCreators(updateuser_action, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Registration)
