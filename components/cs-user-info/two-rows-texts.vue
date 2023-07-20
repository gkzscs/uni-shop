<template>
	<view class="two-rows-texts">
		<text>{{obj.num}}</text>
		<text>{{obj.title}}</text>
	</view>
</template>

<script>
	export default {
		name: "two-rows-texts",
		
		props: {
			obj: {
				type: Object,
				default: {
					num: 0,
					title: '' 
				}
			}
		}
	}
</script>

<style lang="scss">
	.two-rows-texts {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
</style>