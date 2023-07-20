<template>
	<view class="text-arrow-menu" @click="click_slot">
		<text>{{title}}</text> 
		<uni-icons type="arrowright" size="16"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "text-arrow-menu",
		
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		
		methods: {
			click_slot() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.text-arrow-menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
				
		text {
			line-height: 90rpx;
			font-size: 32rpx;
		}
	}
</style>