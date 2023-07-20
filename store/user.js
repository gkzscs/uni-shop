export default {
	namespaced: true,
	
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		user_info: JSON.parse(uni.getStorageSync('user_info') || '{}'),
		redirect_info: {}
	},
	
	mutations: {
		// address
		set_address(state, addr) {
			state.address = addr 
			
			this.commit('m_user/sync_address_2_storage')
		},
		
		sync_address_2_storage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		
		// user info
		set_user_info(state, info) {
			state.user_info = info 
			
			this.commit('m_user/sync_user_info_2_storage')
		},
		
		sync_user_info_2_storage(state) {
			uni.setStorageSync('user_info', JSON.stringify(state.user_info))
		},
		
		// token
		set_token(state, token) {
			state.token = token 
			
			this.commit('m_user/sync_token_2_storage')
		},
		
		sync_token_2_storage(state) {
			
			uni.setStorageSync('token', state.token)
		},
		
		// redirect info
		set_redirect_info(state, info) {
			state.redirect_info = info 
		}
	},
	
	getters: {
		address_str(state) {
			if (!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		},
		
		user_token(state) {
			return state.token
		}
	}
}