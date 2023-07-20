// import Vue from 'vue'
// import Vuex from 'vuex' 
import { createStore } from 'vuex'
import module_cart from '@/store/cart.js'
import module_goods from '@/store/goods.js'
import module_user from '@/store/user.js'
 

const store = createStore({
	modules: { 
		m_cart: module_cart, 
		m_goods: module_goods,
		m_user: module_user
	}
})

export default store