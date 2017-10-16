<template>
	<div class="home">
		<v-header @updatelanguageActive="updateLanguage"></v-header>
    <div class="s-goods-top">
      <div class="s-goods-top-left"></div>
      <div class="s-goods-top-right">
        <div class="dishes-rt"></div>
      </div>
    </div>
		<v-goods :languageActive="languageActive"></v-goods>
    <div class="s-goods-bottom">
      <div class="s-goods-bottom-left"></div>
      <div class="s-goods-bottom-right">
        <div class="dishes-b">
          <div class="dishes-b-inner"></div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import Header from '@/components/header/header.vue'
import Goods from '@/components/goods/goods.vue'
// languageActive: 语言状态，0为中文，1为英文

export default{
  data() {
    return {
      languageActive: 0
    }
  },
  components: {
    'v-header': Header,
    'v-goods': Goods
  },
  computed: {

  },
  methods: {
    updateLanguage (index) {
      this.languageActive = index
      console.log(this.languageActive)
    }
  }
}
</script>

<style lang="stylus" type="text/stylus">
  .s-goods-top
    display flex
    padding: 5px 10px 0 10px
    position: relative
    height: 40px
    box-sizing: border-box
    .s-goods-top-left
      flex: 0 0 61px
      width: 61px
    .s-goods-top-right
      flex 1
      background: #fff
      border-radius 20px 20px 0 0
      .dishes-rt
        z-index: 10
        position: absolute
        right: 20px
        bottom: -15px
        width: 54px
        height: 33px
        background url("ico.png")
  .s-goods-bottom
    display flex
    position: fixed
    bottom: 65px
    padding 0 10px
    height: 50px
    width  100%
    box-sizing: border-box
    .s-goods-bottom-left
      flex: 0 0 60px
      width: 60px
    .s-goods-bottom-right
      flex 1
      background: #fff
      .dishes-b
        position: relative
        width: 100%
        height: 50px
        background: url(dishes-b-bg.png), #000
        background-size: 100% 100%
        .dishes-b-inner
          position: absolute
          bottom 10px
          height: 22px
          width: 59%
          background-image: url(dishes-b-inner.png)
          background-size: 100% 100%
</style>
