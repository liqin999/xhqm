import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import login from '@/pages/login'
import container from '@/pages/container'
import { getCookie } from "@/utils/public";
const userList = r =>require.ensure([],() => r(require("@/pages/userManagement/userList")),"userList");
import {routes} from "./routes.js"
Vue.use(Router)
let router = new Router({
	mode: 'history',
	routes: [
		{
			path: '',
			component: App, //顶层路由，对应index.html
			children: [
				 {
					path: '/container',
					component: container,
					meta: {
					   requireAuth: true,
					},
					children: [
					    ...routes
					]
				  }, 
				  {
					path: '/login',
					component: login
				  },
				  {
					path: '*',
					component: userList,
					redirect:'userList'
				}
			]
		},

	]
})


//路由拦截
router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
		if (getCookie("xidentityId") == 'user') {
			Vue.prototype.$message({
				showClose: true,
				message: "你没有权限",
				type: "error"
			  });
			  next({
				  path: '/login'
		      })
		} else if(!!getCookie("xidentityId")){
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