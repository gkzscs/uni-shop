<template>
	<view class="shell" :style="{'background-color': bg_color}">
		<view class="search-area" :style="{'border-radius': radius + 'px'}" @click="search_area_click_slot">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cs-search",
		
		props: {
			bg_color: {
				type: String,
				default: 'firebrick'
			},
			
			radius: {
				type: Number,
				default: 18
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods: {
			search_area_click_slot() {
				this.$emit('click')
				console.log('search_area_click_slot')
				
			}
		}
	}
</script>

<style lang="scss">
	.shell {
		display: flex; 
		justify-content: center;
		align-items: center;
		height: 100rpx;
		// background-color: firebrick;
	}
	
	.search-area {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90%;
		height: 80%;
		background-color: white;
		// border-radius: 30rpx;

		uni-icons {
			margin-right: 10rpx;
		}
	}
</style>