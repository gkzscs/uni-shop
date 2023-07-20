export default {
	namespaced: true,
	
	state: {
		list_goods: [
			{
				"cat_id": 998,
				"goods_id": 998,
				"goods_name": "400ml 统一鲜橙多，营养丰富口感好",
				"goods_price": 14,
				"goods_number": 100,
				"goods_weight": 3,
				"goods_big_logo": "/static/img/1.jpg",
				"goods_small_logo": "/static/img/1.jpg",
				"add_time": 1516662792,
				"upd_time": 1516662792,
				"hot_number": 0,
				"is_promote": false,
				"cat_one_id": 962,
				"cat_two_id": 981,
				"cat_three_id": 998
			},
			{
				"cat_id": 999,
				"goods_id": 2,
				"goods_name": "switch 全球畅销游戏机，创意十足，还可以游玩《赛尔达传说 王国之泪》哦！",
				"goods_price": 2198,
				"goods_number": 100,
				"goods_weight": 3,
				"goods_big_logo": "/static/img/2.jpg",
				"goods_small_logo": "/static/img/2.jpg",
				"add_time": 1516662792,
				"upd_time": 1516662792,
				"hot_number": 0,
				"is_promote": false,
				"cat_one_id": 962,
				"cat_two_id": 981,
				"cat_three_id": 998
			},
			{
				"cat_id": 666,
				"goods_id": 1,
				"goods_name": "青云足球 据说拥有玄妙的力量，可以让经常踢它的人变得十分强大！四肢发达，头脑敏捷，以及你无法想象的超能力！",
				"goods_price": 0,
				"goods_number": 3,
				"goods_weight": 1,
				"goods_big_logo": "/static/img/3.jpg",
				"goods_small_logo": "/static/img/3.jpg",
				"add_time": 1516662792,
				"upd_time": 1516662792,
				"hot_number": 0,
				"is_promote": false,
				"cat_one_id": 962,
				"cat_two_id": 981,
				"cat_three_id": 998
			}
		],
		
		goods_obj: {}
	},
	
	mutations: {
		get_goods_obj_by_id(state, id) {
			const info = state.list_goods.find(x => x.goods_id == id)
			if (!info) return null 
			
			state.goods_obj = {
				goods_id: info.goods_id,
				goods_name: info.goods_name,
				goods_price: info.goods_price,
				goods_count: 1,
				goods_small_logo: info.goods_small_logo,
				goods_state: true 
			}
		},
	},
	
	getters: {
		goods_info(state, id) {
			const item = state.list_goods.find(x => x.goods_id == id)
			return item 
		},
		
		goods_list(state) {
			return state.list_goods
		}
		
	}
}