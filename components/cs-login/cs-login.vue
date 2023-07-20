<template>
	<view class="login-box">
		<uni-icons type="contact-filled" size="100" color="#fafafa"></uni-icons>
		<button type="primary" open-type="getUserInfo" @getuserinfo="btn_get_user_info_slot">一键登录</button>
		<text>登录后尽享更多权益</text>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	
	export default {
		name:"cs-login",
		data() {
			return {
				
			};
		},
		
		computed: {
			...mapState('m_user', ['user_info', 'token', 'redirect_info']),
		},
		
		methods: {
			...mapMutations('m_user', ['set_user_info', 'set_token', 'set_redirect_info']),
			
			btn_get_user_info_slot(e) {
				// 拒绝
				if (e.detail.errMsg.includes('auth deny')) {
					uni.$show_msg('您取消了登录授权')
					return
				}
				
				// 允许
				this.set_user_info(e.detail.userInfo)
				
				this.req_token(e.detail)
			},
			
			async req_token(infoDetail) {
				const res = await uni.login().catch(err => err) 
				if (res.errMsg != 'login:ok') {
					uni.$show_msg('登录失败')
					return 
				}
				
				// assemble data 
				const query = {
					code: res.code 
				}
 
				// request for login 
				// the url maybe unavailable
				// const { data: wxRes } = await uni.$http.post('/api/public/v1/users/wxlogin', query) 
				// console.log(wxRes) 
				// if (wxRes.meta.code != 200) {
				// 	uni.$show_msg(wxRes.meta.msg)
				// 	return 
				// }
				
				const token = this.user_info
				uni.$show_msg('登录成功')

				// save token 
				this.set_token(token)
				this.navigate_back()
			},
			
			assemble_token() {
				const token = {
					"avatar_src": "/static/img/2.jpg",
					"nick_name": "gkzscs"
				}
				
				return token 
			},
			
			navigate_back() {
				if (!this.redirect_info) return 
				
				if (this.redirect_info.open_type == 'switchTab') {
					uni.switchTab({
						url: this.redirect_info.url,
						complete: this.set_redirect_info({})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20rpx;
		height: 750rpx;
		background-color: #f8f8f8; 
		overflow: hidden;
		
		&::after {
			position: absolute;
			content: '';
			display: block;
			bottom: 0; 
			width: 100%;
			height: 80rpx; 
			transform: translateY(50%);
			background-color: white;
			border-radius: 50%;
		}
		
		button {
			width: 90%; 
			height: 100rpx;
			background-color: firebrick;
			border-radius: 50rpx;
		}
		
		text {
			color: #888;
		}
	}
</style>