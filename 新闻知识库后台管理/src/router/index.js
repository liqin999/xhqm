import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

import userList from '@/pages/userManagement/userList'
import RoleManage from '@/pages/RoleManage'
import Authority from '@/pages/Authority'
import Organization from '@/pages/Organization'
import spaceLimit from '@/pages/spaceLimit'
import login from '@/pages/login'
Vue.use(Router)

let router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'login',
			component: login
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/userList',
			name: 'userList',
			component: userList,
			meta: {
				requireAuth: true,
			 },
		},
		{
			path: '/roleManage',
			name: 'RoleManage',
			component: RoleManage,
			meta: {
				requireAuth: true,
			 },
		},
		{
			path: '/authority',
			name: 'Authority',
			component: Authority,
			meta: {
				requireAuth: true,
			 },
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
			meta: {
				requireAuth: true,
			 },
		},
		{
            path: '*',
            component: login,
            redirect:'login'
        }
	]
})


//路由拦截
router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
		if (localStorage.xidentityId == 'user') {
			Vue.prototype.$message({
				showClose: true,
				message: "你没有权限",
				type: "error"
			  });
			  next({
				  path: '/login'
		      })
		} else if(!!localStorage.xidentityId){
			next();
		}
		else {
			next({
				path: '/login'
			})
		}
	}
	else {
		next();
	}
  })
export default router;