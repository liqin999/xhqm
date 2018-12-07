
const userList = r =>require.ensure([],() => r(require("@/pages/userManagement/userList")),"userList");
const RoleManage = r =>require.ensure([],() => r(require("@/pages/RoleManage")),"RoleManage");
const Authority = r =>require.ensure([],() => r(require("@/pages/Authority")),"Authority");
const Organization = r =>require.ensure([],() => r(require("@/pages/Organization")),"Organization");
const spaceLimit = r =>require.ensure([],() => r(require("@/pages/spaceLimit")),"spaceLimit");

export let routes = [
    {
        path: '/userList',
        name: 'userList',
        component: userList,
    },
    {
        path: '/roleManage',
        name: 'RoleManage',
        component: RoleManage,
       
    },
    {
        path: '/authority',
        name: 'Authority',
        component: Authority,
       
    },
    // {
    // 	path: '/organization',
    // 	name: 'Organization',
    // 	component: Organization
    // },

    {
        path: '/spaceLimit',
        name: 'spaceLimit',
        component: spaceLimit,
       
    },
]