<template>
	<view class="shell">
		<scroll-view class="goods-panel">
			<block v-for="(item, i) in list_goods">
				<cs-goods :goods="item" @click="goods_item_click_slot(item)"></cs-goods>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex' 
	
	export default {
		computed: {
			
		},
		
		data() {
			return {
				query_obj: {
					query: '',
					cid: '',
					page_idx: 1,
					page_size: 10
				},
				
				list_goods: [],
				total_count: 0, 
				
				is_loading: false 
			};
		},
		
		onLoad(opt) {
			this.query_obj.query = (opt.query || '')
			this.query_obj.cid = (opt.cid || '')
			
			this.append_goods()
		},
		
		onReachBottom() {
			++this.query_obj.page_idx
			if (this.query_obj.page_idx * this.query_obj.page_size > this.total_count) {
				uni.showToast({
					title: '到底啦！'
				}, 1000)
				
				return 
			}
			
			this.append_goods()
		},
		
		onPullDownRefresh() {
			this.reset_members()
			this.append_goods()
			
			uni.stopPullDownRefresh()
		},
		
		methods: {
			...mapGetters('m_goods', ['goods_list']),
			
			append_goods() {
				// check if available
				if (this.is_loading) {
					uni.showLoading({
						title: '加载中，请稍后...'
					})
					
					return
				}
				
				this.is_loading = true 
				
				const arrGoods = {
					"total": 23,
					"pagenum": 1,
					
					"goods": []
				}
				
				const arrGoodsUnit = this.goods_list() 
				
				// to repeate some goods, so that the list would be more rich
				for (let i = 0, n = 10 / arrGoodsUnit.length; i < n; ++i) {
					arrGoods.goods.push(...arrGoodsUnit)
				}
				
				// append to data 
				this.list_goods = [...this.list_goods, ...arrGoods.goods]
				this.total_count = arrGoods.total
				
				this.is_loading = false 
			},
			
			reset_members() {
				this.query_obj.page_idx = 1 
				this.list_goods = []
				this.total_count = 0
				this.is_loading = false 
			},
			
			// slots
			goods_item_click_slot(item) {
				uni.navigateTo({
					url: '/sub_packages/goods_detail/goods_detail?goods_id=' + item.goods_id 
				})
			}
		},
		
		
	
	}
</script>

<style lang="scss">
	.goods-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		
	
	}
</style>
