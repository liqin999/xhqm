import req from '../utils/serviceUtil';

/* 将所有接口统一起来便于维护
 * 可以根据 post或者get 修改 method 值
 */


// 登录
export const userLogin = data => {
    return req.post("/basicservice/login/", data);
}
//  查询用户列表
export const getUserLists = data => {
    return req.post("/basicservice/getUserLists/", data);
}
//  获取角色列表信息
export const getAllRoleList = data => {
    return req.get("/basicservice/getAllRoleList/" +data.userId) ;
}
//  新增角色
export const addRole = data => {
    return req.post("/basicservice/addrole", data);
}
// 删除角色信息
export const delRole = data => {
    return req.get("/basicservice/delrole/" + data);
}
//  获取权限列表信息
export const getAllAuthorityList = data => {
    return req.get("/basicservice/getAllAuthorityList");
}
//  新增权限
export const addAuthority = data => {
    return req.post("/basicservice/addauthority", data);
}
//  根据id获取权限详情
export const getAuthorityByAuthorityId = data => {
    return req.get("/basicservice/getAuthorityByAuthorityId/" + data);
}

//  权限修改
export const modifyAuthority = data => {
    return req.post("/basicservice/modifyauthority", data);
}
// 删除权限
export const delAuthority = data => {
    return req.get("/basicservice/delauthority/" + data);
}

//  用户赋予角色
export const modifyUser = data => {
    return req.post("/basicservice/modifyuser", data);
}
//  角色赋予权限
export const modifyRole = data => {
    return req.post("/basicservice/modifyrole", data);
}
// 查询个人,组室,部门空间大小展示
export const showSpaceManage = data => {
    return req.get("/kbaseservice/showSpaceManage" + data.Id + "/" + data.spaceType);
}
// 空间管理,查询,个人,组室,部门空间大小列表
export const showSpaceManageList = data => {
    return req.post("/kbaseservice/showSpaceManageList", data);
}
// 调整个人 组室 部门的空间大小
export const modifySpace = data => {
    return req.get("/kbaseservice/modifySpace/" + data.attachmentLimit + "/" + data.spaceType + "/" + data.id);
}
// 批量调整个人组室部门的空间大小
export const modifySpaceBatch = data => {
    return req.post("/kbaseservice/modifySpaceBatch", data);
}

//空间管理的总占用
export const showTotalSpace = data => {
    return req.post("/kbaseservice/showTotalSpace", data);
}

//权限管理
export const authorityManager = data => {
    return req.get("/basicservice/authorityManager/" + data.userId + "/" + data.orgId + "/" +data.flag);
}

//查询所有部门或者组室 
export const findDepOrGroup = data => {
    return req.post("/basicservice/findDepOrGroup/",data);
}

//查询已有的组室 
export const findAlreadyGroup = data => {
    return req.get("/basicservice/findAlreadyGroup/"+data.userId);
}

//查询已有的部门 
export const findAlreadyDept = data => {
    return req.get("/basicservice/findAlreadyDept/"+data.userId);
}

//修改用户的部门或则组室的接口
export const updateUserDepOrGrop = data => {
    return req.post("/basicservice/updateUserDepOrGrop/" ,data);
}

//空间权限中修改单个阈值
export const modifyThreshold = data => {
    return req.get("/kbaseservice/modifyThreshold/" +data.threshold + "/" +data.spaceType + "/" +data.id);
}

//空间权限中批量修改阈值
export const modifyThresholdBatch = data => {
    return req.post("/kbaseservice/modifyThresholdBatch/" , data);
}

export default {
    userLogin,
    getUserLists,
    getAllRoleList,
    addRole,
    delRole,
    getAllAuthorityList,
    addAuthority,
    modifyUser,
    modifyRole,
    showSpaceManage,
    showSpaceManageList,
    delAuthority,
    modifyAuthority,
    getAuthorityByAuthorityId,
    modifySpace,
    modifySpaceBatch,
    showTotalSpace,
    authorityManager,
    findDepOrGroup,
    findAlreadyGroup,
    findAlreadyDept,
    updateUserDepOrGrop,
    modifyThreshold,
    modifyThresholdBatch

}