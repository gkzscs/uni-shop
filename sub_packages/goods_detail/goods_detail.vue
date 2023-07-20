<template>
	<!-- 根据`goods_info.goods_name`来决定是否显示页面内容 -->
	<view class="shell" v-if="goods_info.goods_name">
		<!-- 轮播图 -->
		<swiper class="img-box" indicator-dots="true" autoplay="true" interval="1000" duration="200">
			<swiper-item v-for="(item, i) in goods_info.pics">
				<image :src="item.pics_big" mode="aspectFill" @click="preview_img(i)"></image>
			</swiper-item>
		</swiper>
		 
		<!-- 标题栏 -->
		<view class="brief-box">
			<text class="price">￥{{goods_info.goods_price}}</text>
			<text class="title">{{goods_info.goods_name}}</text>
			<view class="collect-box">
				<uni-icons type="star" size="18"></uni-icons>
				<text>收藏</text>
			</view>
			<text class="freight">快递：免运费</text>
		</view>
		
		<!-- 详情 -->
		<rich-text class="detail-box" :nodes="goods_info.goods_introduce"></rich-text> 
		 
		<!-- 商品导航栏组件 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="left_btns_cfg" :button-group="right_btns_cfg" @click="left_btn_click_slot" @buttonClick="right_btn_click_slot"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	
	export default {
		computed: {
			...mapGetters('m_cart', ['total_count']),
			...mapState('m_goods', ['goods_obj']),
		},
		
		data() {
			return {
				goods_info: {}, 
				
				left_btns_cfg: [
					{
						icon: "shop",
						text: " 店铺",
						infoBackgroundColor: "red",
						infoColor: "white"
					},
					{
						icon: "cart",
						text: "购物车",
						infoBackgroundColor: "red",
						infoColor: "white"
					}
				],
				
				right_btns_cfg: [
					{
						text: "加入购物车",
						backgroundColor: "#ff0000",
						color: "#fff"
					},
					{
						text: "立即购买",
						backgroundColor: "#ffa200",
						color: "#fff"
					}
				]
			};
		},
		
		onLoad(opt) {
			this.read_goods_info(opt.goods_id)
		},
		
		watch: {
			total_count: {
				handler(newVal) {
					const cfg = this.left_btns_cfg[1]
					if (!cfg) return 
					
					cfg.info = newVal
				},
				
				immediate: true 
			}
		},
		
		methods: {
			// 映射store中的方法
			...mapMutations('m_cart', ['add_2_cart']),
			...mapMutations('m_goods', ['get_goods_obj_by_id']),
			
			// 点击事件
			left_btn_click_slot(e) {
				let newUrl = null 
				
				switch (e.index) {
				case 0:
					console.log('store')
					break 
				case 1:
					newUrl = '/pages/cart/cart'
					uni.switchTab({
						url: newUrl
					})
					break 
				}
			},
			
			right_btn_click_slot(e) {
				console.log(e)
				switch (e.index) { 
				case 0:
				{
					const goods = this.assemble_goods_by_id(this.goods_info.goods_id)
					this.add_2_cart(goods)
					break 
				}
				case 1:
					break 
				}
			},
			
			// assist methods
			assemble_goods_by_id(id) {
				this.get_goods_obj_by_id(id)
				return this.goods_obj
			}, 
			
			read_goods_info(id) {
				this.get_goods_obj_by_id(id)
				const infoJo = {
					"goods_id": this.goods_obj.goods_id,
					"cat_id": this.goods_obj.cat_id,
					"goods_name": this.goods_obj.goods_name,
					"goods_price": this.goods_obj.goods_price,
					"goods_number": this.goods_obj.goods_number,
					"goods_weight": this.goods_obj.goods_weight,
					"goods_introduce": `<div class="ETab" id="detail">
            <div class="tab-main large" data-fixed="pro-detail-hd-fixed">
                <ul>
                    <li data-tab="trigger" data-anchor="#detail" class="current" clstag="shangpin|keycount|product|shangpinjieshao_3">商品介绍</li>
                                                        <li data-tab="trigger" data-anchor="#detail" clstag="shangpin|keycount|product|pcanshutab">规格与包装</li>
                                                                                <li data-tab="trigger" data-anchor="#detail" clstag="shangpin|keycount|product|ershouzhijian" style="display:none">质检报告</li>
                                                            <li data-tab="trigger" data-anchor="#detail" clstag="shangpin|keycount|product|psaleservice">售后保障</li>
                                                            <li data-tab="trigger" data-offset="38" data-anchor="#comment" clstag="shangpin|keycount|product|shangpinpingjia_3">商品评价<s>(10万+)</s></li>
                                                                                <li class="shieldShopInfo" data-tab="trigger" data-anchor="#shop-similar-promotion" clstag="shangpin|keycount|product|bendianhaopingshangpin">本店好评商品</li>
                                        <li style="display:none" data-tab="trigger" data-offset="38" data-anchor="#try-holder" clstag="shangpin|keycount|product|try-entry">京东试用<sup>new<b>◤</b></sup></li>
                                </ul>
                <div class="extra">
                                        <div class="item addcart-mini">
                        <div class="J-addcart-mini EDropdown" data-role="drop">
                            <div class="inner">
                                <div class="head" data-drop="head">
                                                                        <a id="InitCartUrl-mini" class="btn-primary" href="//cart.jd.com/gate.action?pid=13713459&amp;pcount=1&amp;ptype=1" onclick="log(&quot;product&quot;, &quot;gouwuchexuanfu_3&quot;, &quot;13713459&quot;)">加入购物车</a>
                                                                    </div>
                                <div class="content hide" data-drop="content">
                                    <div class="mini-product-info">
                                        <div class="p-img fl">
                                            <img src="//img14.360buyimg.com/n4/jfs/t1/185445/32/34172/158609/643e1001Fdff99bc4/0880288f343b37c6.jpg.avif" data-img="1" width="100" height="100">
                                        </div>
                                        <div class="p-info lh">
                                            <div class="p-name">汗青堂丛书123· 大英帝国三部曲I：昭昭天命 品遗迹中回忆大英帝国的兴盛和衰落&nbsp; 爱德华.斯坦福旅行写作杰出贡献奖得主简.莫里斯作品&nbsp; 英国史</div>
                                            <div class="p-price">
                                                <strong class="J-p-13713459">110.00</strong> <span>X <span class="J-buy-num"></span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                                                        </div>
            </div>
            <div class="tab-con">
                <div data-tab="item">
                    <div class="p-parameter">
                                                                        <ul class="parameter2 p-parameter-list">
                              <li title="九州出版社" clstag="shangpin|keycount|product|chubanshe_3">出版社：
                    <a target="_blank" title="九州出版社" href="//book.jd.com/publish/九州出版社_1.html">九州出版社</a>
    </li>
<li title="9787522515427">ISBN：9787522515427</li>
<li title="1">版次：1</li>
<li title="13713459">商品编码：13713459</li>
<li title="后浪">品牌：<a href="//www.jd.com/pinpai/1-1713-303237.html" clstag="shangpin|keycount|product|pinpai_1713">后浪</a></li>
<li title="精装">包装：精装</li>
<li title="16开">开本：16开</li>
<li title="2023-04-01">出版时间：2023-04-01</li>
<li title="胶版纸">用纸：胶版纸</li>
                        </ul>
                                            </div>
                    <div id="quality-life" class="quality-life" style="display:none" clstag="shangpin|keycount|product|pinzhishenghuo">
                        <div class="q-logo">
                            <img src="//img11.360buyimg.com/devfe/jfs/t19249/266/555939662/10324/447efd03/5a965eb2Nf83fd68c.jpg" alt="品质生活">
                        </div>
                        <ul class="quality-icon">
                                                                                                                                            <li class="J-ql-iframe ql-ico-1" data-type="1" data-text="质量承诺" style="display:none" data-title="质量承诺" clstag="shangpin|keycount|product|zhijianchengnuo">
                                <a href="#none"><i></i><span>质量承诺</span></a>
                            </li>
                            <li class="ql-ico-5" data-type="5" data-text="耐久性标签" style="display:none" clstag="shangpin|keycount|product|naijiuxingbiaoqian">
                                <a href="#none"><i></i><span>耐久性标签</span></a>
                            </li>
                            <li class="ql-ico-3" data-type="3" data-text="吊牌" style="display:none" clstag="shangpin|keycount|product|diaopai">
                                <a href="#none"><i></i><span>吊牌</span></a>
                            </li>
                            <li class="ql-ico-4" data-type="4" data-text="质检报告" style="display:none" clstag="shangpin|keycount|product|zhijianbaogao">
                                <a href="#none"><i></i><span>质检报告</span></a>
                            </li>
                            <li class="ql-ico-2" data-type="2" data-text="CCC证书" style="display:none" clstag="shangpin|keycount|product|3czhengshu">
                                <a href="#none"><i></i><span>CCC证书</span></a>
                            </li>
                                                                                    <li class="fresh-ico-1" data-text="实时温控" data-type="v1" style="display:none" clstag="shangpin|keycount|product|shishiwenkong">
                                <a href="#none"><i></i><span class="J-fresh-wd fresh-wd"></span><span>实时温控</span></a>
                            </li>
                            <li class="fresh-ico-2" data-text="检验报告" data-type="v2" style="display:none" clstag="shangpin|keycount|product|jiancebaogao">
                                <a href="#none"><i></i><span>检验报告</span></a>
                            </li>
                                                    </ul>
                    </div>
                    <div id="suyuan-video"></div>
                                        <div id="J-detail-banner"></div>
                                                            <div id="activity_header" clstag="shangpin|keycount|product|activityheader"></div>
                                                                                                    <div id="J-detail-pop-tpl-top-new" clstag="shangpin|keycount|product|pop-glbs">
                                            </div>
                                                            <div class="detail-content clearfix z-have-detail-nav" data-name="z-have-detail-nav">
                        <div class="detail-content-wrap">
                                                                                    
                            <div class="detail-content-item">
                                <div id="J-detail-top"></div>
                                                                <div id="J-detail-content" style="font-family: pingfangSC;font-size: 14px;color: #757575;">            <div id="detail-tag-id-1" name="detail-tag-id-1" text="产品特色" class="book-detail-item" clstag="shangpin|keycount|product|chanpintesequ_3">
        <div class="item-mt">
            <h3>产品特色</h3>
        </div>
        <div class="item-mc">
            <div class="book-detail-content"><p><img class="" src="//img30.360buyimg.com/vc/jfs/t1/183774/40/35233/4134745/6458b4c7Fc7edb7a3/6004ae0c939306f6.jpg"></p></div>
        </div>
    </div>
                    <div id="detail-tag-id-2" name="detail-tag-id-2" text="编辑推荐" class="book-detail-item" clstag="shangpin|keycount|product|bianjituijianqu_3">
        <div class="item-mt">
            <h3>编辑推荐</h3>
        </div>
        <div class="item-mc">
            <div class="book-detail-content">
                                <p>维多利亚女王登基后，英国继续对外扩张，成为强盛的大帝国，又在两次世界大战后一步步退缩，重新变成岛国。这段曲折历史有多少人物和故事？</p> 
<p>本书作者简·莫里斯是旅行作家，她没有仅限于爬梳各种历史文献，而是探访了亚洲、非洲、北美洲很多地方，在荒野、战场、城市、旧居中寻找旧帝国留下的痕迹，她以优美的文笔，再现生动的历史场景，写下在历史现场的复杂感受。</p> 
<p>在三部曲的第一部中，作者追溯了从维多利亚登基到1897年大英帝国扩张侵略的历史，记叙了喀布尔大溃退、印度兵变、祖鲁战争、阿散蒂战争、与布尔人的冲突等战事，也记叙了废除奴隶贸易、澳大利亚土著的消亡、探索尼罗河、爱尔兰大饥荒、万国博览会、爱尔兰自治运动等大事件，展现了19世纪英国“野蛮生长”的状态。</p> 
<p><br></p>            </div>
        </div>
    </div>
                    <div id="detail-tag-id-3" name="detail-tag-id-3" text="内容简介" class="book-detail-item" clstag="shangpin|keycount|product|neirongjianjiequ_3">
        <div class="item-mt">
            <h3>内容简介</h3>
        </div>
        <div class="item-mc">
            <div class="book-detail-content"><p>   </p> 
<p>《大英帝国三部曲》以巨大的篇幅，记叙了从维多利亚女王登基到丘吉尔去世的英国历史，叙事笔法光辉生动，涉及不同大洲风貌、各色人物形象和多场战争，辅以作者的实地考察所见，再现了大英帝国从兴起逐渐走向衰落的漫长历程。</p> 
<p>第一部《昭昭天命》追溯了从维多利亚登基到1897年大英帝国扩张侵略的历史，记叙了喀布尔大溃退、印度兵变、祖鲁战争、阿散蒂战争、与布尔人的冲突等战事，也记叙了废除奴隶贸易、澳大利亚土著的消亡、探索尼罗河、爱尔兰大饥荒、万国博览会、爱尔兰自治运动等大事件，展现了19世纪下半叶英国的社会变化、技术发展，以及殖民者视野中亚洲、非洲、美洲、大洋洲不同地区的社会风貌。</p> 
<p> <br></p> 
<p><br></p></div>
        </div>
    </div>
                    <div id="detail-tag-id-4" name="detail-tag-id-4" text="作者简介" class="book-detail-item" clstag="shangpin|keycount|product|zuozhejianjiequ_3">
        <div class="item-mt">
            <h3>作者简介</h3>
        </div>
        <div class="item-mc">
            <div class="book-detail-content"><p>简•莫里斯（1926—2020），记者、历史学者、旅行作家、英国皇家文学学会会员，获英帝国司令勋章，以记叙英帝国历史的《大英帝国三部曲》以及描写牛津、威尼斯、的里雅斯特、纽约等城市的作品而闻名，2018年获爱德华•斯坦福旅行写作杰出贡献奖。</p> 
<p><br></p></div>
        </div>
    </div>
                                <div id="detail-tag-id-5" name="detail-tag-id-5" text="精彩书评" class="book-detail-item" clstag="shangpin|keycount|product|jingcaishupingqu_3">
        <div class="item-mt">
            <h3>精彩书评</h3>
        </div>
        <div class="item-mc">
            <div class="book-detail-content"><p>有多少专业历史学家能够写出如此令人愉悦的书呢？这是一本建筑师策划、工匠拼装、细木工打磨的书。 ——《星期日泰晤士报》</p> 
<p>精心的杰作，笔法壮丽，色调丰富，范围广泛。 ——《爱尔兰时报》</p> 
<p>精彩之作……历史、地理和常识的良好组合，还有生动的涂鸦文字——那些惊人之人的墓志铭、诗歌、日记、书信、誓言、赞美诗和感叹。这些人带着固执的仁善，改变了世界的面貌。 ——格拉斯哥.赫勒尔德</p> 
<p>充满多彩和意味深长的细节。 ——《纽约时报书评》</p> 
<p><br></p></div>
        </div>
    </div>
                                                        <br></div><!-- #J-detail-content -->
                                <div id="J-detail-bottom"></div>
                                                                                                <div id="activity_footer" clstag="shangpin|keycount|product|activityfooter"></div>
                                                            </div>
                        </div>
                                                <div id="J-detail-nav" class="detail-content-nav" style="display: block;">
                            <ul id="J-detail-content-tab" class="detail-content-tab">     <li data-id="detail-tag-id-1" clstag="shangpin|keycount|product|maodian-产品特色" data-text="产品特色" class="current">        <a href="#none">            <i class="arrow-l">                <b class="layer1"></b>                <b class="layer2"></b>            </i>            <i class="arrow-r"></i>产品特色        </a>    </li>    <li data-id="detail-tag-id-2" clstag="shangpin|keycount|product|maodian-编辑推荐" data-text="编辑推荐" class="">        <a href="#none">            <i class="arrow-l">                <b class="layer1"></b>                <b class="layer2"></b>            </i>            <i class="arrow-r"></i>编辑推荐        </a>    </li>    <li data-id="detail-tag-id-3" clstag="shangpin|keycount|product|maodian-内容简介" data-text="内容简介">        <a href="#none">            <i class="arrow-l">                <b class="layer1"></b>                <b class="layer2"></b>            </i>            <i class="arrow-r"></i>内容简介        </a>    </li>    <li data-id="detail-tag-id-4" clstag="shangpin|keycount|product|maodian-作者简介" data-text="作者简介">        <a href="#none">            <i class="arrow-l">                <b class="layer1"></b>                <b class="layer2"></b>            </i>            <i class="arrow-r"></i>作者简介        </a>    </li>    <li data-id="detail-tag-id-5" clstag="shangpin|keycount|product|maodian-精彩书评" data-text="精彩书评">        <a href="#none">            <i class="arrow-l">                <b class="layer1"></b>                <b class="layer2"></b>            </i>            <i class="arrow-r"></i>精彩书评        </a>    </li></ul>
                                                                                    <div class="clr"></div>
                                                                                                                <div class="book-qrcode">
                                <div class="imgbox">
                                    <img src="//img13.360buyimg.com/imagetools/jfs/t1/117265/40/11215/56974/5efc073bE9ab1a3f8/eb97a773ae676c83.png" alt="">
                                </div>
                                <div class="text">下载客户端，开始阅读之旅</div>
                            </div>
                                                                                </div>
                    </div>
                                        <div id="J-detail-pop-tpl-bottom-new" clstag="shangpin|keycount|product|pop-glbs">
                                            </div>
                                                                <div id="J-hot-reco" skus="" class="m-box book-rec-box" clstag="shangpin|keycount|product|53" data-lazyload-fn="0"></div>
                        <!--<div id="J-hot-fo" class="m-box book-rec-box" clstag="shangpin|keycount|product|54"></div>-->
                                                                                <div class="clb"></div>
                </div>
                                                <div data-tab="item" class="hide">
                                        <div class="package-list">
                        <h3>包装清单</h3>
                        <p>暂无</p>
                    </div>
                </div>
                                                <!--艺术家-->
                                                            <div data-tab="item" class="hide">
                    <!--质检报告-->
                </div>
                                                <div data-tab="item" class="hide">
                    <!--售后保障 家用电器展示一个图文的字段 -->
                </div>
                                                <div data-tab="item" class="hide">
                    <!--商品评价-->
                </div>
                                                                <div data-tab="item" class="hide">
                    <!--本店好评商品-->
                </div>
                                <div data-tab="item" class="hide"></div>
                        </div>
        </div>`,
					"goods_big_logo": "/static/img/1.jpg",
					"goods_small_logo": "/static/img/1.jpg",
					"goods_state": 2, 
					"is_del": "0",
					"add_time": 1516662792,
					"upd_time": 1516662792,
					"delete_time": null,
					"hot_number": 0,
					"is_promote": false,
					"cat_one_id": 962,
					"cat_two_id": 981,
					"cat_three_id": 998,
					"goods_cat": "962, 981, 998",
					"pics": [
						{
							"pics_id": 1,
							"goods_id": 666,
							"pics_big": "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
							"pics_mid": "/static/img/1.jpg",
							"pics_sma": "/static/img/1.jpg",
							"pics_big_url": "",
							"pics_mid_url": "",
							"pics_sma_url": ""
						},
						{
							"pics_id": 2,
							"goods_id": 666,
							"pics_big": "https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF",
							"pics_mid": "/static/img/2.jpg",
							"pics_sma": "/static/img/2.jpg",
							"pics_big_url": "",
							"pics_mid_url": "",
							"pics_sma_url": ""
						},
						{
							"pics_id": 3,
							"goods_id": 666,
							"pics_big": "https://t7.baidu.com/it/u=1297102096,3476971300&fm=193&f=GIF",
							"pics_mid": "/static/img/3.jpg",
							"pics_sma": "/static/img/3.jpg",
							"pics_big_url": "",
							"pics_mid_url": "",
							"pics_sma_url": ""
						}
					],
					"attrs": [
						{
							"goods_id": 57332,
							"attr_id": 8519,
							"attr_value": "400",
							"add_price": 0,
							"attr_name": "主体-型号",
							"attr_sel": "only",
							"attr_write": "manual"
							
						}
					]
				}
				
				this.goods_info = infoJo
			},
			
			preview_img(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			}
		}
	}
</script>

<style lang="scss">
	.shell {
		padding-bottom: 100rpx;
	}
	
	// 轮播图
	.img-box {
		height: 450rpx; 
		background-color: aqua;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	// 标题栏
	.brief-box {
		position: relative;
		padding: 10rpx;
		margin: 10rpx;
		
		.price {
			display: block;
			color: firebrick;
			font-size: 40rpx; 
			font-style: italic;
		}
		
		.title {
			display: inline-block;
			font-size: 32rpx;
			font-weight: bold;
			width: calc(100% - 120rpx);
			height: 100rpx;
			// white-space: pre-wrap;
			// white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		
		.collect-box {
			position: absolute;
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100rpx;
			height: 100rpx;
			right: 0;
			font-size: 24rpx;
			border-left: 1px solid #ccc;
			color: #888;
		}
		
		.freight {
			display: block;
			font-size: 24rpx;
			color: #888;
			margin: 10rpx;
		}
	}
	
	// 商品导航栏组件
	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0; 
		width: 100%;
	}
</style>
