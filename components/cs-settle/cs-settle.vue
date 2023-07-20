<template>
	<view class="shell">
		<radio color="firebrick" :checked="is_select_all" @click="select_all_click_slot">全选</radio>
		<text class="price">合计: <text>￥{{price.toFixed(2)}}</text></text>  
		<view class="settle" @click="settle_click_slot">结算({{amount}})</view>
	</view>
</template>

<script>
	export default {
		name:"cs-settle",
		data() {
			return {
				
			};
		},
		
		props: {
			price: {
				type: Number,
				default: 0
			},
			
			amount: {
				type: Number,
				default: 0
			},
		
			is_select_all: {
				type: Boolean,
				default: true 
			}
		},
		
		methods: {
			select_all_click_slot() {
				this.$emit('select-all-click')
			},
			
			settle_click_slot() {
				this.$emit('settle-click')
			}
		}
	}
</script>

<style lang="scss">
	.shell {
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		bottom: 0; 
		width: 100%;
		height: 100rpx;
		font-size: 32rpx;
		background-color: white;
		
		.price {
			text {
				color: firebrick;
				font-weight: bold;
			}
		}
		
		.settle {
			background-color: firebrick;
			width: 240rpx;
			height: 100%;
			text-align: center;
			line-height: 100rpx;
		}
	}
</style>