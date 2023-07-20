<template>
	<view class="goods-item" @click="click_slot">
		<view class="left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="show_radio" @click="radio_click_slot"></radio>
			<image :src="goods.goods_small_logo || default_goods_small_logo" mode="aspectFill"></image>
		</view>
		
		<view class="right">
			<text class="title">{{goods.goods_name}}</text>
			
			<view class="price-count-box">
				<text class="price">￥{{goods.goods_price | to_fixed}}</text>
				<uni-number-box class="count" :min="1" :value="goods.goods_count" v-if="show_number_box" @change="num_box_change_slot"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cs-goods",
		
		props: {
			goods: {
				type: Object,
				default: {}
			},
			
			show_radio: {
				type: Boolean,
				default: false 
			},
			
			show_number_box: {
				type: Boolean,
				default: false 
			}
		},
		
		data() {
			return {
				default_goods_small_logo: '/static/img/2.jpg'
			};
		},
		
		methods: {
			click_slot() {
				this.$emit('click')
			},
			
			radio_click_slot() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			
			num_box_change_slot(val) {
				console.log(val)
				const n = this.filter_invalid_val(val)
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					// use `+` or `-0` to ensure the `goods_count` is a number
					goods_count: +n 
				})
			},
			
			// assist methods
			filter_invalid_val(val) {
				const n = parseInt(val)  
				if (!n) {
					n = 1
				}
				
				return n 
			}
		},
		
		filters: {
			to_fixed(n) { 
				console.log(n)
				return Number(n).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		height: 200rpx; 
		padding: 10rpx;
		border-bottom: 1px solid #ccc; 
		
		.left {			
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			> image {
				width: 200rpx; 
				height: 200rpx;
			}
		}
		
		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10rpx; 
			flex: 1fr 1fr;
			
			.title {
				font-size: 32rpx; 
				height: 70%;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.price-count-box {
				// width: 750rpx; 
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 10rpx;
				.price {
					font-weight: bold;
					font-size: 40rpx; 
					color: #c00000;
					font-style: italic;
				}
			}
			

		}
	}
</style>