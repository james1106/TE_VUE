<template>
  <header class="m-header">
    <div class="m-header-bg">
      <div class="m-header-tit">
        <p class="m-header-l f-fl f-bold">胡大椒</p>
        <div class="m-header-m f-fl">
          <span class="f-fl">你是</span>
          <p class="f-fl">普通逗比</p>
        </div>
        <div class="m-header-r f-fr">
          <div class="language">
            <p class="f-fl f-tc f-bold" v-for="(item,index) in language" :class="{'active': languageActive === index}"
               @click="isActive(index)">{{item}}</p>
          </div>
        </div>
        <div class="f-clr"></div>
      </div>
      <div class="couponList" ref="menucouponList">
        <ul class="couponList-ul">
          <li class="f-fl f-tc">食品赠券.</li>
          <li class="f-fl f-tc">食品赠券.</li>
          <li class="f-fl f-tc">食品赠券.</li>
          <li class="f-fl f-tc">食品赠券.</li>
          <li class="f-fl f-tc">食品赠券.</li>
          <div class="f-clr"></div>
        </ul>
      </div>
      <div class="dishes-t">
        <div class="dishes-t-l"></div>
        <div class="dishes-t-r">
          <div class="dishesInnerBg"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        language: ['中文', 'EN'],
        languageActive: 0
      }
    },
    computed: {},
    methods: {
      isScroll() {
        this.couponscroll = new BScroll(this.$refs.menucouponList, {
          scrollX: 'true'
        })
      },
      isActive(index) {
        this.languageActive = index
        this.$emit('updatelanguageActive', index)
      }
    },
    created() {
      this.$nextTick(() => {
        this.isScroll()
      })
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .m-header
    width: 100%
    height: 62px
    padding: 0 10px
    box-sizing: border-box
    .m-header-bg
      height: 52px
      background: url(topbg.png)
      background-size: 100% 100%

  .m-header-tit
    .m-header-l
      width: 30%
      color: #1a1b1f
      font-size: 16px
      text-align: center
      line-height: 30px
    .m-header-r
      width: 22%
      padding-right: 2%
      line-height: 0.3px
      .language
        width: 100%
        position: relative
        height: 20px
        line-height: 20px
        margin-top: 6px
        border-radius: 6px
        font-size: 12px
        overflow: hidden
        p
          position: relative
          z-index: 1
          width: 50%
        .active
          background: #000
          color: #fff
    .m-header-m
      padding-left: 2%
      width: 42%
      padding-top: 8px
      height:20px
      line-height:20px
      span
        position: relative
        font-size: 14px
      p
        padding: 0 12px
        margin-left: 6px
        background-color: #f39849
        color: #fff
        border-radius: 12px
        font-size: 10px

  .couponList
    width: 100%
    position: relative
    line-height: 16px
    overflow: hidden
    .couponList-ul
      width: 100%
      padding-left: 10px
      display: flex
      li
        flex: 1
        text-align: center
        font-size: 12px

  .dishes-t
    position: relative
    width: 100%
    height: 15px
    display: flex
    .dishes-t-l
      margin-right: 10px
      flex: 4
      background: url("header02.png") no-repeat
      background-size: 100% 100%
    .dishes-t-r
      margin-left: 10px
      flex: 2
      background: url("header01.png") no-repeat
      background-size: 100% 100%
</style>
