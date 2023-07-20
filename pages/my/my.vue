<template>
	<view class="shell">
		<cs-login v-if="!user_token"></cs-login>
		<cs-user-info v-else></cs-user-info>
	</view>
</template>

<script>
	import tabbar_badge from '@/mixins/tabbar_badge.js'
	import { mapState, mapMutations, mapGetters } from 'vuex' 
	
	export default {
		mixins: [tabbar_badge],
		
		computed: {
			...mapGetters('m_user', ['user_token'])
		},
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.shell {
		height: 100vh;
		background-color: white;
	}
</style>
