<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImage="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
     
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './child/DetialNavBar'
import DetailSwiper from './child/DetailSwiper'
import DetailBaseInfo from './child/DetailBaseInfo'
import DetailShopInfo from './child/DetailShopInfo'
import DetailGoodsInfo from './child/DetailGoodsInfo'
import DetailParamInfo from './child/DetailParamInfo'
import DetailCommentInfo from './child/DetailCommentInfo'



import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages:[],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    }
  },
  created() {
    //保存iid
    this.iid = this.$route.query.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      //轮播图
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //商品信息
      
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //店铺信息
      this.shop = new Shop(data.shopInfo)
      //保存商品的详情数据
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>