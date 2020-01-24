import {combineReducers} from 'redux'

import Registration from './defaultreducers/Registration/Registration_reducer'
import auth from './defaultreducers/Login/Login_Reducer'
import View_User from './defaultreducers/View_AllUser/View_AllUser_reducer'
import View_Seleted_User from './defaultreducers/View_SelectedUser/View_SelectedUser_reducer'

export default combineReducers({Registration,auth,View_User,View_Seleted_User})