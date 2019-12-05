<template>
<swiper class="detail-swipe">
  <swiper-item  v-for="(item,index) in topImage" :key="index">
    <img :src="item" alt="">
  </swiper-item>
</swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "DetailSwiper",
  props: {
    topImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .detail-swipe {
    height: 300px;
    overflow: hidden;
  }
</style>