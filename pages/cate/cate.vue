<template>
	<view class="shell">
		<!-- 自定义搜索组件 -->
		<cs-search :bg_color="'orange'" :radius="18" @click='cs_search_click_slot'></cs-search>
		
		<view class="content-box"> 
			<!-- 左侧滚动区域 -->
			<scroll-view class="left-scroll-box" scroll-y="true" :style="{height: window_h + 'px'}">
				<view :class="['item', active_idx === i ? 'active' : '']" v-for="(item, i) in list_cates" @click="category_click_slot(i)">
					{{item.name}}
				</view>
			</scroll-view>
			
			<!-- 右侧滚动区域 -->
			<scroll-view class="right-scroll-box" scroll-y="true" :scroll-top="right_scroll_top" :style="{height: window_h + 'px'}">
				<view class="item" v-for="(item, i) in list_cates_level2">
					<view class="title">/ {{item.name}} /</view>
					
					<view class="cates-level3-box">
						<view class="brand" v-for="(item_lv3, i3) in item.children" @click="brand_click_slot(item_lv3)">
							<image class="icon" :src="'/static/icon/' + item_lv3.icon + '.png'"></image>
							<text class="name">{{item_lv3.name}}</text>
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabbar_badge from '@/mixins/tabbar_badge.js'
	
	export default {
		mixins: [tabbar_badge],
		
		data() {
			return {
				window_h: 0,
				active_idx: 0,
				right_scroll_top: 0,
				list_cates: [],
				list_cates_level2: [],
				list_cates_level3: []
			};
		},
		
		onLoad() {
			// change ui 
			const sysInfo = uni.getSystemInfoSync()
			// subtract the height of search box
			this.window_h = sysInfo.windowHeight - 50
			
			// read data 
			this.append_cates()
			
			// switch 2 category
			this.switch_2_category_by_idx(this.active_idx)
		},
		
		methods: {
			append_cates() {
				const arrCates = [
					{
						"id": 1,
						"name": "大家电",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": "",
						"children": [
							{
								"id": 3,
								"name": "电视",
								"pid": 1,
								"level": 1,
								"deleted": false,
								"icon": "",
								"children": [
									{
										"id": 5,
										"name": "曲面电视",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "tv/1"
									},
									{
										"id": 6,
										"name": "平面电视",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "tv/2"
									}
								]
							},
							{
								"id": 4,
								"name": "游戏机",
								"pid": 1,
								"level": 1,
								"deleted": false,
								"icon": "",
								"children": [
									{
										"id": 5,
										"name": "switch",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/1"
									},
									{
										"id": 6,
										"name": "ps5",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/2"
									},
									{
										"id": 6,
										"name": "x-box",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/3"
									},
									{
										"id": 6,
										"name": "x-box",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/3"
									}
								]
							}
						]
					},
					{
						"id": 2,
						"name": "日用",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": "",
						"children": [
							{
								"id": 3,
								"name": "牙膏",
								"pid": 1,
								"level": 1,
								"deleted": false,
								"icon": "",
								"children": [
									{
										"id": 5,
										"name": "冷酸灵",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/1"
									},
									{
										"id": 6,
										"name": "高露洁",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/2"
									}
								]
							},
							{
								"id": 4,
								"name": "杯子",
								"pid": 1,
								"level": 1,
								"deleted": false,
								"icon": "",
								"children": [
									{
										"id": 5,
										"name": "switch",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/1"
									},
									{
										"id": 6,
										"name": "ps5",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/2"
									},
									{
										"id": 6,
										"name": "x-box",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "game-machine/3"
									}
								]
							}
						]
					},
					{
						"id": 3,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": "",
						"children": [
							{
								"id": 3,
								"name": "经典",
								"pid": 1,
								"level": 1,
								"deleted": false,
								"icon": "",
								"children": [
									{
										"id": 5,
										"name": "西游记",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "book/4"
									},
									{
										"id": 6,
										"name": "三国演义",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "book/5"
									}
								]
							},
							{
								"id": 4,
								"name": "好书推荐",
								"pid": 1,
								"level": 1,
								"deleted": false,
								"icon": "",
								"children": [
									{
										"id": 5,
										"name": "鲁滨逊漂流记",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "book/1"
									},
									{
										"id": 6,
										"name": "小超狼",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "book/2"
									},
									{
										"id": 6,
										"name": "钢铁是怎样炼成的",
										"pid": 3,
										"level": 2,
										"deleted": false,
										"icon": "book/3"
									}
								]
							}
						]
					},
					{
						"id": 4,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": ""
					},
					{
						"id": 5,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": ""
					},
					{
						"id": 6,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": ""
					},
					{
						"id": 7,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": ""
					},
					{
						"id": 8,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": ""
					},
					{
						"id": 9,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": ""
					},
					{
						"id": 10,
						"name": "书箱",
						"pid": 0,
						"level": 0,
						"deleted": false,
						"icon": ""
					}
				]
				
				// 添加数据
				this.list_cates = [...this.list_cates, ...arrCates]
			},
			
			switch_2_category_by_idx(idx) {
				this.active_idx = idx 
				this.list_cates_level2 = this.list_cates[idx].children
				
				this.change_right_scroll_top()
			},
			
			change_right_scroll_top() {
				// if the value are the same, then it would not make effect
				this.right_scroll_top = 1
				this.right_scroll_top = 0
			},
			
			category_click_slot(idx) {
				this.switch_2_category_by_idx(idx)
			},
			
			brand_click_slot(item) {
				uni.navigateTo({	
					url: '/sub_packages/goods_list/goods_list?cid=' + item.id
				})
			},
			
			cs_search_click_slot() {
				console.log('cs_search_click_slot')
				uni.navigateTo({
					url: '/sub_packages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content-box {
		display: flex;
	}
	
	.left-scroll-box {
		width: 120px;
		
		.item {
			font-size: 30rpx;
			// height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			background-color: aliceblue;
			
			&.active {
				position: relative;
				background-color: wheat;
				color: firebrick;
				
				&::before {
					display: block;
					content: '';
					position: absolute;
					width: 10rpx;
					height: 50%;
					background-color: firebrick;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}

	.right-scroll-box {
		width: calc(100% - 120px);

		.item {
			.title {
				text-align: center;
				font-size: 36rpx;
				font-weight: bold;
				padding: 30rpx 0;
			}
			
			.cates-level3-box {
				display: flex;
				flex-wrap: wrap;
				
				.brand {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 33.33%;
					margin-bottom: 20rpx;
					
					.icon {
						width: 120rpx;
						height: 120rpx;
					}
					
					.name {
						font-size: 30rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>
