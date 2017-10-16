<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,index) in images" :key="index"><img v-show="slide.max" :src="slide.max"/></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
 
<script>
export default {
  props: {
    images: {
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      }
    }
  },
  mounted() {
  }
}
</script>

<style>

</style>
