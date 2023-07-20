<template>
	<view class="shell">
		<!-- 搜索组件 -->
		<view class="search-box">
			<cs-search @click="cs_search_click_slot"></cs-search>
		</view>
		
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, idx) in list_swipers">
				<navigator class="swiper-item" :url="'/sub_packages/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航区 -->
		<view class="nav-panel">
			<view class="nav-item" v-for="(item, i) in list_navigates" @click="nav_click_slot(item)">
				<image :src="item.image_src"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- 楼层区 -->
		<view class="floors-panel">
			<view class="floor-item" v-for="(item, i) in list_floors">
				<!-- 标题 -->
				<text class="floor-title">{{item.floor_title.name}}</text>
				
				<!-- 商品图片面板 -->
				<view class="floor-img-box">
					<!-- 左侧图片 -->
					<navigator :url="item.product_list[0].url">
						<image class="left-img-box" :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="aspectFill"></image>
					</navigator>
					
					<!-- 右侧图片 -->
					<view class="right-img-box">
						<navigator class="img-box" :url="subItem.url" v-for="(subItem, subIdx) in item.product_list" v-if="subIdx !== 0">  
							<image class="product-img" :src="subItem.image_src" :style="{width: subItem.image_width + 'rpx'}" mode="aspectFill"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabbar_badge from '@/mixins/tabbar_badge.js'
	
	export default {
		mixins: [tabbar_badge],
		
		data() {
			return {
				list_swipers: [],
				list_navigates: [],
				list_floors: []
			};
		},
		
		onLoad() {
			this.append_swipers() 
			this.append_navigates()
			this.append_floors()
		},
		
		methods: {
			append_swipers() {
				// 声明swiper数组
				const arrSwipers = [
					{
						"image_src": "/static/img/1.jpg",
						"open_type": "navigate",
						"goods_id": 129,
						"navigator_url": "/pages/goods_detail/main?goods_id=129"
					},
					{
						"image_src": "/static/img/2.jpg",
						"open_type": "navigate",
						"goods_id": 395,
						"navigator_url": "/pages/goods_detail/main?goods_id=395"
					},
					{
						"image_src": "/static/img/3.jpg",
						"open_type": "navigate",
						"goods_id": 38,
						"navigator_url": "/pages/goods_detail/main?goods_id=38"
					}
				]
					
				this.list_swipers = [...this.list_swipers, ...arrSwipers]
			},
			
			append_navigates() {
				// 声明swiper数组
				const arrNavs = [
					{
						"image_src": "/static/img/1.jpg",
						"open_type": "navigate",
						"name": "分类",
						"navigator_url": "/pages/goods_detail/main?goods_id=129"
					},
					{
						"image_src": "/static/img/2.jpg",
						"open_type": "navigate",
						"name": "秒杀拍",
						"navigator_url": "/pages/goods_detail/main?goods_id=395"
					},
					{
						"image_src": "/static/img/3.jpg",
						"open_type": "navigate",
						"name": "超市购",
						"navigator_url": "/pages/goods_detail/main?goods_id=38"
					},
					{
						"image_src": "/static/img/1.jpg",
						"open_type": "navigate",
						"name": "母婴品",
						"navigator_url": "/pages/goods_detail/main?goods_id=38"
					}
				]
					
				this.list_navigates = [...this.list_navigates, ...arrNavs]
			},	// append_navigates
			
			append_floors() {
				const arrFloors = [
					{
						"floor_title": {
							"name": "时尚女装",
							"image_src": "https://www.zhangzhicheng.cn/pyg/pic_floor01_title.png"
						},
						"product_list": [
							{
								"name": "优质服饰",
								"image_src": "/static/img/1.jpg",
								"image_width": "250",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=服饰"
							},
							{
								"name": "爆款清仓",
								"image_src": "/static/img/2.jpg",
								"image_width": "250",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=清仓"
							},
							{
								"name": "春季热门",
								"image_src": "/static/img/3.jpg",
								"image_width": "250",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=热门"
							},
							{
								"name": "春季热门",
								"image_src": "/static/img/3.jpg",
								"image_width": "250",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=热门"
							}
						]
					},
					{
						"floor_title": {
							"name": "箱包配饰",
							"image_src": "https://www.zhangzhicheng.cn/pyg/pic_floor01_title.png"						,
						},
						"product_list": [
							{
								"name": "清新气质",
								"image_src": "/static/img/1.jpg",
								"image_width": "250",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=饰品"
							},
							{
								"name": "复古胸针",
								"image_src": "/static/img/2.jpg",
								"image_width": "250",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=胸针"
							},
							{
								"name": "水晶项链",
								"image_src": "/static/img/3.jpg",
								"image_width": "220",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=水晶项链"
							},
							{
								"name": "复古胸针",
								"image_src": "/static/img/2.jpg",
								"image_width": "280",
								"open_type": "navigate",
								"navigator_url": "pages/goods_list?query=胸针"
							},
						]
					}
				]
				
				// deal with the data 
				arrFloors.forEach(floor => {
					floor.product_list.forEach(product => {
						product.url = '/sub_packages/goods_list/goods_list?' + product.navigator_url.split('?')[1]
					})
				})
				
				this.list_floors = [...this.list_floors, ...arrFloors]
			},	// append_floors
			
			// request data from web 
			async req_swipers() {
				this.list_swipers = this._req_data_by_url('/api/public/v1/home/swipers')
			},
			
			async req_navigates() {
				this.list_navigates = this._req_data_by_url('/api/public/v1/home/catitems')
			},
			
			async req_floors() {
				this.list_floors = this._req_data_by_url('/api/public/v1/home/floordata')
			},	
			
			async _req_data_by_url(url) {
				const { data: res } = await uni.$http.get(url)
				
				// 成功
				if (res.meta.status !== 200) {
					uni.$show_fail_msg()
					return
				}
				
				// 失败
				uni.$show_succeed_msg()
				return res.message				
			},	// _req_data_by_url
			
			// 事件
			cs_search_click_slot() {
				uni.navigateTo({
					url: '/sub_packages/search/search'
				})
			},
			
			nav_click_slot(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}	// nav_click_slot
		}
	}
</script>

<style lang="scss">
	// search box
	.search-box {
		position: sticky; 
		top: 0;
		z-index: 999;
	}
	
	// swiper panel
	swiper {
		height: 330rpx;
		
		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	// navigation panel
	.nav-panel {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		margin: 10rpx 0;
	}
	
	.nav-item {
		position: relative;
		width: 128rpx;
		height: 100%;
		
		image {
			width: 128rpx;
			height: 128rpx;
			margin-bottom: 0;
			border-radius: 50%;
		}
		
		text {
			display: block;
			width: 100%;
			line-height: 30rpx;
			font-size: 30rpx;
			text-align: center;
		}
	}
	
	// floor panel 
	.floors-panel {
		width: 100%;
		
		.floor-item {
			width: 100%;
			padding: 10rpx;
			
			.floor-title {
				display: inline-block;
				position: relative;
				font-size: 40rpx;
				text-shadow: 0 0 8rpx orange;
				color: rebeccapurple;
				margin-bottom: 20rpx;
				
				::after {
					display: block;
					content: '';
					position: absolute;
					bottom: -16rpx;
					width: 100%;
					height: 16rpx;
					border-radius: 5rpx;
					background-color: blue;
				}
			}
			
			.floor-img-box {
				display: flex;
				height: 300rpx;
				
				.left-img-box {
					height: 95%;
				}
				
				.right-img-box {
					display: flex;
					justify-content: space-around;
					flex-wrap: wrap;
					height: 100%;
					
					.img-box {
						height: 45%;
						
						.product-img {
							height: 100%;
						}
					}
				}
			}
			
		}
	}
	

	

</style>
