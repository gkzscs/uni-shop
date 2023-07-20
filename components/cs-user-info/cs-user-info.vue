<template>
	<view class="user-info">
		<!-- 用户基本信息 -->
		<view class="basic-info-box">
			<image :src="user_info.avatarUrl" class="avatar"></image>
			<text class="nickname">{{user_info.nickName}}</text>
		</view>
		
		<!-- 面板列表 -->
		<view class="panel-list">
			<view class="panel-item panel1">
				<block v-for="(item, i) in list_panel1_data">
					<two-rows-texts :obj="item"></two-rows-texts>
				</block>
			</view>
			
			<view class="panel-item panel2">
				<view class="title">我的订单</view>
				
				<view class="my-orders-box">
					<block v-for="(item, i) in list_panel2_data">
						<icon-text-v :obj="item"></icon-text-v>
					</block>
				</view>
			</view>
			
			<view class="panel-item panel3">
				<block v-for="(item, i) in list_panel3_data">
					<text-arrow-menu :title="item" @click="menu_click_slot(i)"></text-arrow-menu>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import twoRowsTexts from '@/components/cs-user-info/two-rows-texts.vue'
	import iconTextV from '@/components/cs-user-info/icon-text-v.vue'
	import textArrowMenu from '@/components/cs-user-info/text-arrow-menu.vue'
	import { mapState, mapGetters, mapMutations } from 'vuex'
	
	export default {
		name:"cs-user-info", 
		
		components: { 
			twoRowsTexts,
			iconTextV,
			textArrowMenu
		},
		
		data() {
			return { 
				list_panel1_data: [],
				list_panel2_data: [],
				list_panel3_data: []
			};
		},
		
		computed: {
			...mapState('m_user', ['user_info']), 
		},
		
		created() {
			this.init_members()
		},
		
		
		methods: {
			...mapMutations('m_user', ['set_user_info', 'set_token', 'set_address']),
			
			// init methods
			init_members() {
				this.init_panel1_data()
				this.init_panel2_data()
				this.init_panel3_data()
			},
			
			init_panel1_data() {
				this.list_panel1_data = [
					{
						num: 8,
						title: '收藏的店铺'
					},
					{
						num: 14,
						title: '收藏的商品'
					},
					{
						num: 18,
						title: '关注的商品'
					},
					{
						num: 84,
						title: '足迹'
					}
				]
			},
			
			init_panel2_data() {
				this.list_panel2_data = [
					{
						"icon": "/static/icon/order/obligation.png",
						"title": "待付款"
					},
					{
						"icon": "/static/icon/order/wait-for-receiving.png",
						"title": "待收货"
					},
					{
						"icon": "/static/icon/order/refund.png",
						"title": "退款/退货"
					},
					{
						"icon": "/static/icon/order/all-orders.png",
						"title": "全部订单"
					}
				]
			},
			
			init_panel3_data() {
				this.list_panel3_data = [
					'收货地址',
					'联系客服',
					'退出登录'
				]
			},
			
			// slots
			menu_click_slot(e) {
				switch (e) {
				case 0:
					break
				case 1:
					break 
				case 2:
					this.try_log_out() 
					break
				}
			},
			
			// assist methods
			async try_log_out() {
				const res = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				if (res && res.confirm) {
					this.log_out()
				}
			},
			
			log_out() {
				this.set_token('')
				this.set_address({})
				this.set_user_info({})
			}
		}
	}
</script>

<style lang="scss">
	.user-info {
		height: 100vh;
		background-color: #f4f4f4; 
		
		// 用户基本信息
		.basic-info-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 400rpx; 
			background-color: #c00000; 
			gap: 20rpx;
			
			.avatar {
				width: 200rpx; 
				height: 200rpx; 
				border-radius: 50%;
				border: 4rpx solid white;
				box-shadow: 0 2rpx 10rpx black;
			}
			
			.nickname {
				font-size: 40rpx;
				font-weight: bold;
				color: white;
			}
		}
		
		// 面板列表
		.panel-list {
			display: flex;
			flex-direction: column;
			gap: 16rpx;
			padding: 0 20rpx; 
			position: relative;
			top: -20rpx;
			font-size: 30rpx;
			
			.panel-item {
				display: flex;
				border-radius: 10rpx; 
				background-color: white;
				padding: 20rpx;
			}
			
			.panel1 {
				justify-content: space-around;
				align-items: center;
			}
			
			.panel2 {
				flex-direction: column;
				gap: 20rpx;
				
				.title {
					border-bottom: 1px solid #ccc;
					line-height: 90rpx;
					margin-top: -20rpx;
					font-size: 32rpx;
				}
				
				.my-orders-box {
					display: flex;
					justify-content: space-around;
					align-items: center;
				}

			}
		
			.panel3 {
				padding: 0 20rpx;
				flex-direction: column;
				
				text-arrow-menu {
					border-top: 1px solid #ccc;
					
					&:first-of-type {
						border: none;
					}
				}
			}
		}
	}
</style>