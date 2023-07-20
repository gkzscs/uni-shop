import { mapGetters } from 'vuex' 

export default {
	computed: {
		...mapGetters('m_cart', ['total_count']) 
	},
	
	// this would cause `"setTabBarBadge:fail not TabBar page"` error
	watch: {
		total_count() {
			this.update_badge()
		}
	},
	
	data() {
		return {
			
		}
	},
	
	onShow() {
		this.update_badge()
	},
	
	methods: {
		update_badge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total_count + ''
			})
		}
	}
}

