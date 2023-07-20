export default {
	namespaced: true,
	
	state: () => ({
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]') 
	}),
	
	mutations: {
		add_2_cart(state, goods) {
			const foundGoods = state.cart.find(x => x.goods_id === goods.goods_id) 
			if (!foundGoods) {
				state.cart.push(goods)
			} else {
				foundGoods.goods_count += goods.goods_count
			}

			this.commit('m_cart/sync_cart_2_storage')
		},
		
		remove_goods_by_id(state, id) {
			const idx = state.cart.findIndex(x => x.goods_id == id)
			if (idx == -1) return 
			
			state.cart.splice(idx, 1)
			
			this.commit('m_cart/sync_cart_2_storage')
		},
		
		sync_cart_2_storage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		
		update_goods_state(state, goods) {
			const foundGoods = state.cart.find(x => x.goods_id == goods.goods_id) 
			if (!foundGoods) return 
			
			foundGoods.goods_state = goods.goods_state 
			
			this.commit('m_cart/sync_cart_2_storage')
		},
		
		update_goods_count(state, goods) {
			const foundGoods = state.cart.find(x => x.goods_id == goods.goods_id) 
			if (!foundGoods) return 
			
			foundGoods.goods_count = goods.goods_count
			
			this.commit('m_cart/sync_cart_2_storage')
		}
	},
	
	getters: {
		total_count(state) {
			let c = 0
			
			state.cart.forEach(x => c += x.goods_count)
			
			return c 
		},
		
		selected_count(state) {
			let c = 0
			
			c = state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
			
			return c 
		},
		
		selected_price(state) {
			let c = 0
			
			state.cart.filter(x => x.goods_state).forEach(x => c += x.goods_price * x.goods_count)	
			
			return c 
		},
		
		// `g` is `getters`
		is_selected_all(state, g) {
			const total = g.total_count
			const selected = g.selected_count
			console.log('total:', total, 'selected:', selected)
			return (total == selected)
		}
	}
}