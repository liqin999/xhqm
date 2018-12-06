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

export default new Router({
	mode: 'history',
	routes: [
		// {
		// 	path: '/',
		// 	name: 'login',
		// 	component: login
		// },
		{
			path: '/',
			name: 'userList',
			component: userList
		},
		{
			path: '/roleManage',
			name: 'RoleManage',
			component: RoleManage
		},
		{
			path: '/authority',
			name: 'Authority',
			component: Authority
		},
		{
			path: '/organization',
			name: 'Organization',
			component: Organization
		},

		{
			path: '/spaceLimit',
			name: 'spaceLimit',
			component: spaceLimit
		}
	]
})
