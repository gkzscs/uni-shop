<template>
	<view class="shell">
		<!-- 选择收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
			<button class="btn_address_choose" type="primary" size="mini" @click="btn_address_choose_click_slot">请选择收货地址+</button>
		</view>
		
		<!-- 详细收货信息 -->
		<view class="address-detail-box" v-else @click="btn_address_choose_click_slot">
			<text class="user-name">收货人: {{address.userName}}</text>
			<text class="cellphone">电话: {{address.telNumber}}</text>
			<uni-icons type="arrowright" size="16"></uni-icons>
			<view class="address">收货地址: <view>{{address_str}}</view></view>
		</view>
		
		<!-- 底部边框线 -->
		<image class="bottom-border"></image>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex' 
	
	export default {	
		name:"cs-address",
		
		data() {
			return {
			};
		},
		
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['address_str'])
		},
		
		methods: {
			...mapMutations('m_user', ['set_address']), 
			
			async btn_address_choose_click_slot() {
				const res = await uni.chooseAddress().catch(e => e)
				if (res.errMsg.includes('ok')) {
					this.set_address(res)
				} else if (res.errMsg.includes('fail auth deny')) {
					this.re_auth()
				}
			},
			
			async re_auth() {
				const [err, res] = await uni.showModal({
					content: '您还没有打开位置权限，是否要开启？',
					confirmText: 'Ok',
					cancelText: 'Cancel',
					confirmColor: '#13962c',
					cancelColor: 'firebrick'
				})
				
				if (err) return 
				
				// confirm 
				if (res.confirm) {
					uni.openSetting({
						success: (tmpRes) => {
							if (tmpRes.authSetting['scope.address']) {
								uni.$show_msg('授权成功，请选择收货地址')
							} else {
								uni.$show_msg('您取消了地址授权')
							}
							
							return 
						}
					})
				}
				
				// cancel
				if (res.cancel) {
					uni.$show_msg('您取消了地址授权')
					return 
				}
			}
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.address-detail-box {
		display: grid;
		grid-template-columns: 1fr 1fr 30rpx;
		font-size: 30rpx; 
		align-items: center;
		
		text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding: 10rpx;
		}
		
		.cellphone {
			justify-self: right;
		}
		
		.address {
			display: flex;
			grid-column: 1 / 4;
			grid-row: 2 / 3;
			height: 100rpx;
			white-space: nowrap;
			padding: 10rpx;
			
			view {
				text-overflow: ellipsis;
				white-space: normal;
			}
		}
	}
	
	.bottom-border {
		width: 100%;
		height: 40rpx;
		background-image: url(/static/icon/png/drink.png);
		background-size: 40rpx;
		background-repeat: repeat-x;
		margin: 20rpx 0;
	}
</style>