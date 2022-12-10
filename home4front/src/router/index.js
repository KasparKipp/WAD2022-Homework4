import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import SignUpView from "../views/SignUpView.vue"
import LogInView from "../views/LogInView.vue"
import auth from "../auth"

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		beforeEnter: async (to, from, next) => {
			console.log("Checking if user is authenticated")
			let isAuth = await auth.authenticated();
			if (!isAuth) {
				next("/login");
			} else {
				next();
			}
		},
	},
	{
		path: "/signup",
		name: "SignUp",
		component: SignUpView,
	},
	{
		path: "/login",
		name: "LogIn",
		component: LogInView,
	},
	{
		path: "/contacts",
		name: "Contacts",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/ContactsView.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
