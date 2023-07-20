<template>
	<view class="icon-text-v">
		<image :src="obj.icon"></image>
		<text>{{obj.title}}</text>
	</view>
</template>

<script>
	export default {
		name: "icon-text-v",
		
		props: {
			obj: {
				type: Object,
				default: {
					icon: '',
					title: ''
				}
			}
		}
	}
</script>

<style lang="scss">
	.icon-text-v {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		
		image {
			width: 70rpx;
			height: 70rpx;
		}
	}
</style>