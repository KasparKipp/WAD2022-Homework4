import { createStore } from 'vuex'

export default createStore({
	state: {
		posts: [
			{
				id: 1,
				date: "Oct 02, 2022",
				body: "Did you know that Tartu is the culture capital of the world in 2024? #Tartu2024",
				img: "https://www.tartu.ee/sites/default/files/field/image/tartu2024-Maam2rk-meeskonnapilt-kiurkaasik-7.jpg",
			},
		],
	},
	getters: {},
	mutations: {},
	actions: {},
	modules: {},
});
