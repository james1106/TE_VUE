<template>
  <transition name="foodComing">
    <div class="food" v-if="foodFlag">
      <div class="food-layout">
        <div class="food-layout-content"  ref="food">
           <div class="food-content">
            <!-- 商品图片 -->
            <div class="food-banner">
              <banner :images="food.images"></banner>
            </div>
             <!-- 返回按钮 -->
             <div @click="hide" class="back">
               <div class="back-bg"><i class="icon-arrow_lift"></i></div>
             </div>
            <!-- 标题信息 -->
            <div class="title-content">
              <div class="name">{{ languageActive == 0 ? food.pname : food.en_pname }}</div>
              <div class="name-title">
                <!-- 商品介绍 -->
                <div v-show="food.sku_type" class="introduce">
                  大数据发货速度发发送大量分解速度发沙发福克斯的四大护法发射方式发送皮沙发和发生了分红酸辣粉和分萨芬撒的后防老化了
                </div>
              </div>
              <div class="price">
                <span class="now">￥{{food.nprice}}</span>
                <span v-show="food.oldPrice" class="old">￥{{food.oPrice}}</span>
              </div>

              <!-- 购物车加减按钮 -->
              <div class="plus-wrapper">
                <cartnum :food="food"></cartnum>
              </div>

              <!-- 加入购物车按钮 -->
              <transition name="fade">
                <div @click.stop.prevent="addFirst" v-show="!food.count || food.count===0" class="buy">加入购物车</div>
              </transition>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartnum from '../cartnum/cartnum'
  import banner from '../banner/banner'

  export default {
    props: {
      food: {
        type: Object
      },
      languageActive: {
        type: Number
      }
    },
    events: {},
    methods: {
      initScroll() {
        this.scroll = new BScroll(this.$refs.food, {
          probeType: 3,
          click: true
        })
        this.scroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 显示商品详情页
      show() {
        this.foodFlag = true
        // 载入 better-scroll
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.destroy() // 销毁重新绑定
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          }
        })
      },
      // 隐藏商品详情页
      hide() {
        this.foodFlag = false
      },
      // 加入购物车
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
        this.$emit('add', event.target)
      }
    },
    computed: {},
    components: {
      cartnum,
      banner
    },
    data() {
      return {
        foodFlag: false
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 65px
    width: 100%
    padding: 10px
    box-sizing: border-box
    z-index: 30
    transform: translate3d(0, 0, 0)
    overflow: hidden
    background: #000
  .foodComing-enter-active
    transition: all 0.6s cubic-bezier(.23,1,.32,1)

  .foodComing-leave-active
    transition: all 0.6s cubic-bezier(.23,1,.32,1)

  .foodComing-enter,
  .foodComing-leave-active
    transform: translate3d(100%, 0, 0)

  .food-layout
    width: 100%
    height: 100%
    border-radius: 40px
    box-sizing: border-box
    background: #000
    overflow: hidden
    .food-layout-content
      width: 100%
      height: 100%
      background: #fff
      overflow: hidden
  /* 商品图片 */
  .food-banner
    position: relative
    width: 100%
    height: 250px
    overflow: hidden
    background: #000
    .swiper-container
      width: 100%
      height: 250px
      border-radius: 40px 40px 0 0
    .swiper-wrapper
      width: 100%
      height: 100%
    .swiper-slide
      width: 100%
      height: 100%
      background-position: center
      background-size: cover
      img
        width: 100%
        height: 100%
    .swiper-pagination-bullet
      width: 0.833rem
      height: 0.833rem
      display: inline-block
      background: #000
    .swiper-pagination-bullet-active
      background: #000

  /* 返回按钮 */
  .back
    z-index: 100
    position: absolute
    top: 20px
    left: 20px
    width: 40px
    height: 40px
    padding: 5px
    box-sizing border-box
    .back-bg
      width: 26px
      height: 26px
      line-height: 26px
      border-radius: 50%
      background blue
      text-align:center
      i
       font-size: 15px
       color: #fff
  .icon-back
    display: block
    padding: 10px
    font-size: 20px
    color: #fff

  /* 标题信息 */
  .title-content
    position: relative
    padding: 18px
    .name
      line-height: 14px
      margin-bottom: 12px
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
    .detail
      margin-bottom: 18px
      line-height: 25px
      height: 10px
      font-size: 0
    .sellCount
      display: inline-block
      font-size: 10px;
      color: rgb(147, 153, 159)
    .rating
      display: inline-block
      font-size: 10px
      color: rgb(147, 153, 159)
      margin-left: 12px
    .price
      font-weight: 700
      line-height: 24px
      .now
        margin-right: 8px
        font-size: 14px
        color: rgb(240, 20, 20)
        .old
          font-size: 10px
          text-decoration: line-through
          color: rgb(147, 153, 159)

  .plus-wrapper
    position: absolute
    right: 10px
    bottom: 10px

  .buy
    position: absolute
    right: 14px
    bottom: 14px
    z-index: 10
    height: 30px
    line-height: 30px
    padding: 0 12px
    box-sizing: border-box
    font-size: 14px
    border-radius: 15px
    color: #fff
    background: rgb(0,160,220)
    opacity: 1
    background-color: rgb(243, 152, 73)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.2s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      z-index: -1

  /* 商品介绍 */
  .introduce
    margin-bottom 12px
    font-size: 12px
    font-weight: 200
    line-height: 16px
    color: rgb(77, 85, 93)

  /* 商品评价 */
  .ratings
    padding-top: 18px
    .title
      line-height: 14px
      margin-left: 18px
      font-size: 14px
      color: rgb(7, 17, 27)
    .ratings-wrapper
      padding: 0 18px
      .ratings-item
        position: relative
        padding: 16px 0
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .user
        position: absolute
        top: 16px
        right: 0
        line-height: 12px
      .name
        display: inline-block
        vertical-align: top
        font-size: 10px
        color: rgb(147, 153, 159)
        margin-right: 6px
      .avatar
        border-radius: 50%
      .time
        margin-bottom: 6px
        line-height: 12px
        font-size: 10px
        color: rgb(147, 153, 159)
      .text
        line-height: 16px
        font-size: 12px
        color: rgb(7, 17, 27)
      .icon-smile
        line-height: 24px
        margin-right: 4px
        font-size: 12px
        color: rgb(0, 160, 220)
      .icon-cry
        line-height: 24px
        margin-right: 4px
        font-size: 12px
        color: rgb(147, 153, 159)
      .no-rating
        padding: 16px 0
        font-size: 12px
        color: rgb(147, 153, 159)
</style>
