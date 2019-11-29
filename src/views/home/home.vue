<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物商城</div></nav-bar>
    <swiper  v-if="banner.length">
    <swiper-item v-for="(item, index) in banner" :key="index">
         <img :src="item.image"  />
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {gerHomeMultidata} from 'network/home';
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: "Home",
  data() {
    return {
      banner: []
    }
  },
  components: {
    NavBar,
    Swiper,
    SwiperItem
  },
  created() {
    gerHomeMultidata().then(res => {
      this.banner = res.data.banner.list
      console.log(res.data.banner)
      
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>