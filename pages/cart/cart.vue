<template>
	<!-- 购物车不为空 -->
	<view class="shell" v-if="cart.length > 0">
		<!-- 收货地址 -->
		<cs-address></cs-address>
		
		<!-- 购物车标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
		
		<!-- 商品列表 -->
		<uni-swipe-action class="goods-list">
			<uni-swipe-action-item :right-options="opts" @click="swipe_action_item_click_slot(goods)" v-for="(goods, i) in cart">
				<cs-goods :goods="goods" :show_radio="true" :show_number_box="true" @radio-change="radio_change_slot" @num-change="num_change_slot"></cs-goods>
			</uni-swipe-action-item>
		</uni-swipe-action>
		
		<!-- 商品结算栏 -->
		<cs-settle :is_select_all="is_selected_all" :price="selected_price" :amount="selected_count" @settle-click="settle_click_slot"></cs-settle>
	</view>
	
	<!-- 购物车为空 -->
	<view class="empty-box">
		<image src="/static/icon/png/empty-cart.png" mode="aspectFit"></image>
		<text>空空如也</text>
	</view>
</template>

<script>
	import tabbar_badge from '@/mixins/tabbar_badge.js'
	import { mapState, mapMutations, mapGetters } from 'vuex' 
	
	export default {
		mixins: [tabbar_badge],
		
		data() {
			return { 
				opts: [
					{
						text: '删除',
						style: {
							backgroundColor: '#c00000'
						}
					}
				],
				
				second: 3,
				tm_toast: null 
			}
		},
		
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['selected_price', 'selected_count', 'is_selected_all']),
			...mapGetters('m_user', ['user_token', 'address_str'])
		},
		
		methods: {
			...mapMutations('m_cart', ['update_goods_state', 'update_goods_count', 
			'remove_goods_by_id']),
			...mapMutations('m_user', ['set_redirect_info']),
			
			// slots
			radio_change_slot(e) {
				this.update_goods_state(e)
			},
			
			num_change_slot(e) {
				this.update_goods_count(e)
			},
			
			swipe_action_item_click_slot(goods) {
				this.remove_goods_by_id(goods.goods_id)
			},
			
			settle_click_slot() {
				if (this.selected_count == 0) {
					uni.$show_msg('请选择要结算的商品')
				} else if (!this.address_str) {
					uni.$show_msg('请填写收货地址')
				} else if (!this.user_token) {
					// uni.$show_msg('请先登录')
					this.auto_delay_jump_2_login_page()
				} 
			},
			
			// assist methods
			auto_delay_jump_2_login_page() {
				// show msg box immediately
				let n = this.second
				this.show_delay_jump_2_login_page_tip(n--)
				
				// refresh the msg box
				this.tm_toast = setInterval(() => {
					if (n <= 0) {
						clearInterval(this.tm_toast)
						this.tm_toast = null 
						
						uni.switchTab({
							url: '/pages/my/my',
							success: this.handle_jump_2_login_page_success()
						})
						return 
					}
					
					this.show_delay_jump_2_login_page_tip(n--)
				}, 1000)
			},
			
			show_delay_jump_2_login_page_tip(n) {
				uni.showToast({ 
					icon: 'none',
					title: '请登录后再结算，' + n + '秒后自动跳转到登录页面',
					duration: 1500,
					mask: true 
				})
			},
			
			handle_jump_2_login_page_success() {
				this.set_redirect_info({
					url: '/pages/cart/cart',
					open_type: 'switchTab'
				})
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		display: flex;
		align-items: center;
		height: 80rpx; 
		padding: 0 10rpx;
		border-bottom: 1px solid #ccc;
		
		text {
			font-size: 32rpx;
			margin-left: 10rpx; 
		}
	}
	
	// empty box 
	.empty-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh; 
		gap: 20rpx;
		
		image {
			width: 200rpx;
			height: 200rpx;
			background-color: orangered;
			border-radius: 50%;
		}
		
		text {
			font-size: 32rpx;
			color: #888;
		}
	}
</style>
