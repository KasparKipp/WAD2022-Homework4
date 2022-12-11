import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import SignUpView from "../views/SignUpView.vue"
import LogInView from "../views/LogInView.vue"
import AddPostView from "../views/AddPostView.vue"
import PostView from "../views/PostView.vue"
import auth from "../auth"

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		beforeEnter: async (to, from, next) => {
			console.log("Checking if user is authenticated");
			let isAuth = await auth.authenticated();
			console.log("Auth: ", isAuth)
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
		path: "/addpost",
		name: "AddPost",
		component: AddPostView,
		beforeEnter: async (to, from, next) => {
			//console.log("Checking if user is authenticated");
			let isAuth = await auth.authenticated();
			if (!isAuth) {
				next("/login");
			} else {
				next();
			}
		},
	},
	{
		path: "/post/:id",
		name: "Post",
		component: PostView,
		beforeEnter: async (to, from, next) => {
			//console.log("Checking if user is authenticated");
			let isAuth = await auth.authenticated();
			if (!isAuth) {
				next("/login");
			} else {
				next();
			}
		},
	},
	{
		path: "/contacts",
		name: "Contacts",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/ContactsView.vue"),
	},
	{
		path: "/:anythingButASlash([^/]+)",
		name: "Lost",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/LostView.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
