<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物商城</div>
    </nav-bar>
    <home-swiper :cbanners="banners"></home-swiper>
    <recommend :crecommends="recommends" />
    <feature />
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="goods[currentType].list"/>
    
  </div>
</template>

<script>
import HomeSwiper from "./child/HomeSwiper";
import Recommend from "./child/Recommend";
import Feature from "./child/Feature";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabcontrol/TabControl';
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from "network/home";

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
      currentType: 'pop'
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodsList
  },
  created() {
    //1请求轮播图和推荐数据
      this.getHomeMultidata()
      
    // 2请求 流行 新款 精选数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

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
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
}
</style>