<template>
	<view class="shell">
		<uni-search-bar @input="search_bar_input_slot" :radius="30" cancelButton="none"></uni-search-bar>
		
		<!-- 搜索历史记录 -->
		<view class="search-history-box" v-if="list_search_results.length == 0">
			<!-- 标题栏 -->
			<view class="title-box">
				<text>搜索历史</text>
				<uni-icons type="trash" size="16" @click="trash_click_slot"></uni-icons>
			</view>
			
			<!-- 历史记录标签 -->
			<view class="history-box">
				<block v-for="(item, i) in histories">
					<view class="item" @click="search_history_click_slot(item)">{{item}}</view>
				</block>
			</view>
		</view>
		
		<!-- 搜索结果列表 -->
		<view class="search-result" v-else>
			<view class="search-result-item" v-for="(item, i) in list_search_results" @click="search_result_click_slot(item)">
				<view>{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tm: null,
				key_words: '',
				list_search_results: [],
				list_search_history: []
			};
		},
		
		onLoad() {
			this.sync_storage_2_search_history()
		},
		
		computed: {
			histories() {
				return [...this.list_search_history].reverse()
			}
		},
		
		methods: {
			// slots
			search_bar_input_slot(e) {
				clearTimeout(this.tm)
				
				this.tm = setTimeout(() => {
					this.key_words = e
					this.update_search_result()
				}, 500)
			},
			
			search_result_click_slot(item) {
				uni.navigateTo({
					url: '/sub_packages/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			
			search_history_click_slot(item) {
				uni.navigateTo({
					url: '/sub_packages/goods_list/goods_list?query=' + item
				})
			},
			
			trash_click_slot() {
				this.list_search_history = []
				this.sync_search_history_2_storage()
			},
			
			// assist functions
			gen_random_word() {
				const start = parseInt('4e00', 16)
				const end = parseInt('9fa5', 16)
				const code = Math.floor(start + Math.random() * (end - start))
				const ch = String.fromCharCode(code) 
				
				return ch 
			},
			
			gen_random_id() {
				const min = 0
				const max = 100
				const id = Math.round(min + Math.random() * (max - min))

				return id 
			},
			
			gen_goods_item(kw, nameCharCount) {
				// gen goods item's brief
				for (let i = 0; i < nameCharCount; ++i) {
					const ch = this.gen_random_word()
					kw += ch
				}
				
				const id = this.gen_random_id()
				
				const item = `{
					"goods_id": ${id},
					"goods_name": "${kw}"
				}`
				
				return item 
			},
			
			gen_search_result(kw) {
				let arrItems = []
				
				// input is empty
				if (this.key_words == '') {
					return arrItems
				}
				
				// get search result by input
				const count = 8;
				
				// generate serveral items
				for (let i = 0; i < count; ++i) {
					const item = this.gen_goods_item(kw, i*6) 
					arrItems.push(item)
				}
				
				// convert string to json object 
				arrItems = `[${arrItems}]`
				return JSON.parse(arrItems)
			},
			
			update_search_result() {
				const arrSearchResult = this.gen_search_result(this.key_words)
				this.list_search_results = [...arrSearchResult]
				
				this.try_append_search_history(this.key_words)
			},
			
			sync_search_history_2_storage() {
				uni.setStorageSync('kw', JSON.stringify(this.list_search_history))
			},
			
			sync_storage_2_search_history() {
				this.list_search_history = JSON.parse(uni.getStorageSync('kw') || '[]')
			},
			
			try_append_search_history(str) {
				// do not save empty string or repeated key words
				if (str == '') return 
				
				// remove old element and push back new element, in order to update its order
				const idx = this.list_search_history.indexOf(str)
				if (idx != -1) {
					this.list_search_history.splice(idx, 1)
				}
				
				// push back new element
				this.list_search_history.push(str)
				
				// store the data to local 
				this.sync_search_history_2_storage()
			}
		}
	}
</script>

<style lang="scss">
	// 搜索栏
	.uni-searchbar {
		background-color: firebrick;
	}
	
	// 搜索历史
	.search-history-box {
		
		// 标题
		.title-box {
			display: flex;
			justify-content: space-between;
			height: 60rpx;
			padding: 10rpx;
			border-bottom: 1px solid #ccc;
			
			text {
				font-size: 32rpx;
				line-height: 60rpx;
			}
			
			uni-icons {
				margin-left: 10rpx;
			}
		}
		
		// 内容标签
		.history-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			padding: 0 10rpx;
			
			.item {
				padding: 10rpx 20rpx; 
				border-radius: 10rpx;
				background-color: antiquewhite;
				margin: 10rpx;
			}
		}
	}
	
	// 搜索结果
	.search-result-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// background-color: goldenrod;
		height: 80rpx;
		border-bottom: 1px solid #ccc;
		padding: 0 10rpx;
		
		&:last-of-type {
			border-bottom: none;
		}
		
		view {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 36rpx;
			letter-spacing: 2rpx;
		}	
			
		uni-icons {
			margin-left: 10rpx;
		}
	}
</style>
