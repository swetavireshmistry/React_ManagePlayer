import baseService from './baseService'

export function Registration_User(credentials){
    return baseService.post('/create',credentials);
}

export function Login_User(credentials){
    return baseService.post('/login',credentials);
}

export function View_AllUser(credentials){
    return baseService.get('/get?pageNo='+credentials.pageNo);
}
export function View_SelectedUser(credentials){
    return baseService.post('/list',{"id":credentials});
}
export function Update_User(id,credentials){
    return baseService.put(`/update/${id}`,credentials);
}
export function Delete_User(credentials){
    return baseService.delete('/delete/'+credentials.id);
}
export function Search_Text(credentials){
    return baseService.get('/find?search='+credentials.search+'&pageNo='+credentials.pageNo+'&team='+credentials.team+'&sort='+credentials.sorting);
}