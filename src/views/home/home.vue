<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物商城</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"  @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :cbanners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend :crecommends="recommends" />
    <feature />
    <tab-control :titles="['流行', '新款', '精选']"  @tabClick="tabClick" ref="tabControl2" />
    <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./child/HomeSwiper";
import Recommend from "./child/Recommend";
import Feature from "./child/Feature";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabcontrol/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backtop/BackTop';

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from 'common/utils'
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //1请求轮播图和推荐数据
      this.getHomeMultidata()
      
    // 2请求 流行 新款 精选数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
   
  },
  mounted() {
     // 监听item中图片加载完成
     const refresh = debounce(this.$refs.scroll.refresh)
      this.$bus.$on('itemImageLoad',() => {
     
      refresh()
    })
  },
 
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
    
    
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scrollY
  
  },
  methods: {
    /*
      网络请求
    */ 
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
       getHomeGoods(type, page).then(res => {
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page += 1
         // 完成上拉加载更多
         this.$refs.scroll.finishPullUp()
    })
    },
    //事件监听相关
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell' 
          break   
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0) 
    },
    contentScroll(position) {
      //判断backTop是否显示
      this.isShowBackTop = (- position.y)> 1000
      //决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop

    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
    
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  height: calc(100% - 93px);
  overflow: hidden;
 
  
}
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>