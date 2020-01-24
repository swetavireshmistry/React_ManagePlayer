import React, { Component } from 'react'
import { Table, Pagination, Button, PaginationItem, PaginationLink } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { FaSearch, FaSortAlphaUp, FaSortAlphaDown, FaEdit, FaTrash } from 'react-icons/fa'
import { Modal, ModalBody } from 'reactstrap'

import * as View_UserAction from '../action/View_User/View_AllUser_action'
import * as Delete_userAction from '../action/View_User/Delete_useraction'

const baseURL = "http://localhost:3032/Upload/"

class View_AllUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            checked: [],
            search_text: "",
            select_team: "",
            sorting: "",
            checked_userid: [],
            showimage: false,
            imgzoom: ""
        }
    }
    componentDidMount() {
        this.setState({
            pageNo: this.props.View_User.current_page
        },
            function () {
                this.props.action.View_User.View_AllUser(this.state).then((data) => {
                }).catch((error) => {
                    alert(error)
                })
            })
    }
    onAllchecked = (e) => {
        var checkall = [...this.state.checked];
        var checkid_arr = [...this.state.checked_userid];
        var check = document.getElementsByName("checkdata");
        if (e.target.checked) {
            checkall.push(Number(this.state.pageNo))
            check.forEach(element => {
                checkid_arr.push(element.value)
            })
        }
        else {
            checkall = checkall.filter(item => item !== Number(this.state.pageNo))
            check.forEach(element => {
                checkid_arr = checkid_arr.filter(item => item !== element.value)
            })
        }
        this.setState({
            checked: checkall,
            checked_userid: checkid_arr
        })
    }
    onchecked = (e) => {
        var checkid_arr = [...this.state.checked_userid];
        var checkall = [...this.state.checked]
        if (e.target.checked)
            checkid_arr.push(e.target.value)
        else {
            checkall = checkall.filter(item => item !== Number(this.state.pageNo))
            checkid_arr = checkid_arr.filter(item => item !== e.target.value)
        }
        var check = document.getElementsByName("checkdata");
        var flag = false;
        check.forEach(element => {
            if (!element.checked)
                flag = true;
        })
        if (!flag)
            checkall.push(Number(this.state.pageNo))
        this.setState({
            checked: checkall,
            checked_userid: checkid_arr
        })
    }
    Displaydata = () => {
        const data = this.props.View_User.Data;
        return data.map((value) => {
            const { username, dob, role, batsmanstyle, bowlerstyle, team, profile, _id } = value;
            return (
                <tr><td><input type="checkbox" onChange={this.onchecked} name="checkdata" value={_id} checked={this.state.checked_userid.includes(_id)} /></td><td>{username}</td><td>{moment(dob).format('DD-MM-YYYY')}</td><td>{role}</td><td>{batsmanstyle}</td><td>{bowlerstyle}</td><td>{team}</td><td><img src={baseURL + profile} onMouseOver={this.zoomimage} width="80px" height="80px" class="rounded" /></td><td><Button outline color="success" onClick={this.btn_edit} id={_id}><FaEdit /></Button></td><td><Button outline color="danger" onClick={(e) => window.confirm("Are you sure you wish to delete this item?") &&
                    this.btn_delete(e)} id={_id}><FaTrash /></Button></td></tr>
            )
        })
    }
    zoomimage = (e) => {
        this.setState({
            imgzoom: e.target.src,
            showimage: !this.state.showimage
        })
    }
    toggle = () => {
        this.setState({
            imgzoom: "",
            showimage: !this.state.showimage
        })
    }
    btn_edit = (e) => {
        e.preventDefault();
        const data = this.props.View_User.Data;
        var editdata = undefined;
        data.map(value => {
            if (value._id === e.target.id)
                editdata = value
        })
        this.props.history.push({ pathname: '/Registration', state: { Data: editdata, editing: true } })
    }
    btn_delete = (e) => {
        e.preventDefault();
        this.props.action.Delete_User.Delete_User({ id: e.target.id }).then((data) => {
            this.props.action.View_User.View_AllUser(this.state)
                .then((data) => {
                }).catch((error) => {
                    alert(error)
                })
        }).catch((error) => {
            alert(error)
        })
    }

    add_user = () => this.props.history.push('/Registration')
    view_user = () => this.props.history.push({ pathname: '/View_Selected_User', state: { IDData: this.state.checked_userid } })

    Pagination = () => {
        var pagecnt = this.props.View_User.total_record / this.props.View_User.limit;
        var elements = [];
        for (var i = 1; i <= Math.ceil(pagecnt); i++) {
            elements.push(<PaginationItem key={i} active={this.props.View_User.current_page == i ? true : false}>
                <PaginationLink href="" id={i} onClick={(e) => this.changePage(e)}>{i}</PaginationLink>
            </PaginationItem>)
        }
        return elements;
    }
    changePage = (e) => {
        document.getElementById("directpgno").value = ""
        e.preventDefault();
        var pgno = 1;
        if (e.target.id == "previous")
            pgno = this.state.pageNo - 1
        else if (e.target.id == "next")
            pgno = Number(this.state.pageNo) + 1
        else
            pgno = e.target.id
        this.setState({
            pageNo: pgno
        },
            function () {
                this.serch_foundrecord()
            })
    }
    directpage = (e) => {
        if (e.target.value != "" && e.target.value <= Math.ceil(this.props.View_User.total_record / this.props.View_User.limit) && e.target.value >= 0) {
            this.setState({
                pageNo: e.target.value
            },
                function () {
                    this.serch_foundrecord()
                })
        }
        else
            if (e.target.value != "") alert("Page Not Found!!")
    }
    serch_foundrecord = () => {
        this.state.search_text != "" || this.state.select_team != "" ?
            this.props.action.View_User.Search_Record({ search: this.state.search_text, pageNo: this.state.pageNo, team: this.state.select_team, sorting: this.state.sorting })
            : this.props.action.View_User.View_AllUser(this.state)
                .then((data) => {

                }).catch((error) => {
                    alert(error)
                })
    }
    save_search = (e) => {
        document.getElementById("directpgno").value = ""
        this.setState({
            search_text: e.target.value,
            pageNo: 1
        },
            function () {
                this.search_found()
            }
        )
    }
    select_team = (e) => {
        e.preventDefault()
        document.getElementById("directpgno").value = ""
        var val = ""
        if (e.target.value != -1)
            val = e.target.value
        this.setState({
            select_team: val,
            pageNo: 1
        },
            function () {
                this.search_found()
            }
        )
    }
    sort_data = (e) => {
        e.preventDefault();
        this.setState({
            sorting: e.target.value
        },
            function () {
                this.search_found()
            }
        )
    }
    search_found = () => {
        this.props.action.View_User.Search_Record({ search: this.state.search_text, pageNo: this.state.pageNo, team: this.state.select_team, sorting: this.state.sorting }).then((data) => {
        }).catch((error) => {
            alert(error)
        })
    }
    render() {
        return (
            <div>
                {this.state.imgzoom != "" &&
                    <Modal isOpen={this.state.showimage} toggle={this.toggle}>
                        <ModalBody>
                            <img src={this.state.imgzoom} width="468px" />
                        </ModalBody>
                    </Modal>
                }
                <div>
                    <div class="d-flex bd-highlight mb-3">
                        <div class="mr-auto p-2 bd-highlight">
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Enter Search Text...." aria-label="Search" name="search_text" onChange={this.save_search} />
                                <FaSearch />
                            </form>
                        </div>
                        <div class="p-2 bd-highlight">
                            <select name="team" class="form-control" onChange={this.select_team}>Filter
                                <option value="-1">Select Team</option>
                                <option value="Team 1">Team 1</option>
                                <option value="Team 2">Team 2</option>
                                <option value="Team 3">Team 3</option>
                            </select>
                        </div>
                        <div class="p-2 bd-highlight">
                            <button color="white" style={{ marginRight: "5px", marginLeft: "-8px", height: "35px", width: "40px" }} onClick={this.sort_data} value="asc"><FaSortAlphaUp /></button>
                            <button color="white" style={{ height: "35px", width: "40px" }} onChange={this.sort_data} value="desc" onClick={this.sort_data}><FaSortAlphaDown /></button>
                        </div>
                    </div>

                </div>
                {this.props.View_User.total_record == 0 ? <h2>No Record Found</h2> :
                    <Table striped bordered>
                        <thead className="table-info">
                            <tr><th><input type="checkbox" checked={this.state.checked.includes(Number(this.state.pageNo))} onChange={this.onAllchecked} id={this.state.pageNo} />Select All</th><th>Username</th><th>DOB</th><th>Role</th><th>BatsmanStyle</th><th>BowlerStyle</th><th>Team</th><th>Profile</th><th colspan="2">Action</th></tr>
                        </thead>
                        <tbody>
                            {this.Displaydata()}
                        </tbody>
                    </Table>}
                <div>
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink href="#" id="1" onClick={this.changePage}>{"<<"}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled={this.state.pageNo == 1}>
                            <PaginationLink href="#" id="previous" onClick={this.changePage}>{"<"}</PaginationLink>
                        </PaginationItem>
                        {this.Pagination()}
                        <PaginationItem disabled={this.state.pageNo == Math.ceil(this.props.View_User.total_record / this.props.View_User.limit)}>
                            <PaginationLink href="#" id="next" onClick={this.changePage}>{">"}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" id={Math.ceil(this.props.View_User.total_record / this.props.View_User.limit)} onClick={this.changePage}>{">>"}</PaginationLink>
                        </PaginationItem>
                        Page No:
                        <div class="col-xs-2">
                            <input type="number" class="form-control" name="directpgno" id="directpgno" onChange={this.directpage} />
                        </div>
                    </Pagination>
                    <Button color="cyan" style={{ float: "right" }} onClick={this.add_user}>Add User</Button>
                    {this.state.checked_userid.length > 0 && <Button color="cyan" style={{ float: "right" }} name="btn_viewuser" onClick={this.view_user}>View User</Button>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { View_User } = state;
    return {
        View_User: View_User
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        View_User: bindActionCreators(View_UserAction, dispatch),
        Delete_User: bindActionCreators(Delete_userAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(View_AllUser)