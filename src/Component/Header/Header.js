import React from 'react'
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Login_action from '../../action/Login/Login_action'

var nlink = {
    color: "white"
}
class Header extends React.Component {
    btn_Logout = (e) => {
        e.preventDefault();
        this.props.action.auth.Logout_User();
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark>
                    {/* <NavbarBrand href="/">Home</NavbarBrand> */}
                    <Nav className="mr-auto" nav-auto="true">
                        <NavItem>
                            <NavLink tag={Link} to={this.props.auth.userrole=="Admin"?"/View_All_User":"/"} style={nlink}>Home</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink tag={Link} to="/View_AllUser" style={nlink}>View All User</NavLink>
                        </NavItem> */}
                    </Nav>
                    <div>    
                            {this.props.auth.token== "" &&
                            <Nav><NavItem>
                            <NavLink tag={Link} to="/Login" style={nlink}>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/Registration" style={nlink}>Registration</NavLink>
                        </NavItem></Nav>}
                        {this.props.auth.token!= "" &&
                        <Nav>
                                <NavItem>
                                <Button color="info" onClick={this.btn_Logout} style={nlink}>LogOut</Button>
                            </NavItem>
                        </Nav>}
                    </div>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth: auth
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        auth: bindActionCreators(Login_action, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)