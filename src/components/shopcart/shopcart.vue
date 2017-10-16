<template>
  <div class="shopcart">
    <!--底部购物车-->
    <div class="priceBox" @click="toggleList">
      <div class="priceBox-left">
        <div class="productNum">
          <i class="f-tc f-blo" v-show="totalCount>0">{{totalCount}}</i>
        </div>
        <div class="totalMon f-tc">￥{{totalPrice}}</div>
      </div>
      <div class="priceBox-right">
        <div class="confirm">
          <p class="f-center" @click.stop.prevent="orderShow">
            <img class="img-responsive" src="./confirm.png" alt="">
          </p>
        </div>
      </div>
    </div>
    <!-- 飞行小球 -->
    <div class="ball-content">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <!--购物车列表-->
    <transition name="fold">
      <div v-show="listShow" class="shopcart-list">
        <div class="shopcart-list-bg">
          <div class="list-header">
            <h1 class="title f-blo">已选商品</h1>
          </div>
          <div ref="listContent" class="list-content">
            <ul>
              <li v-for="food in selectFoods">
                <div class="dishesImg">
                  <span class="new f-blo"></span>
                  <img :src="food.images[0].min" class="dinner f-blo"/>
                </div>
                <div class="dishesInfo">
                  <h5 class="f-bold">{{ languageActive == 0 ? food.pname : food.en_pname }}</h5>
                  <p><i>￥</i>{{food.nprice}}/份 <span class="primeCost">￥{{food.oprice}}</span></p>
                  <span class="alarm"></span>
                </div>
                <div class="cartnum-wrapper">
                  <cartnum :food="food"></cartnum>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <!--模糊背景-->
    <transition name="fade">
      <div v-show="listShow" @click="hideList" class="list-mask"></div>
    </transition>
    <order :selectFoods="selectFoods" ref="order"></order>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartnum from '../cartnum/cartnum'
  import order from '../order/order'

  export default {
    props: {
      selectFoods: {
        type: Array
      },
      languageActive: {
        type: Number
      }
    },
    components: {
      cartnum,
      order
    },
    data() {
      return {
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalCount() {
        var total = 0
        // 遍历传进来的所有的food数据,记录点击的数量
        this.selectFoods.forEach((food) => {
          total += food.count
        })
        return total
      },
      totalPrice() {
        // 一个可变的变量，点击的数量乘以价格
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.count * food.nprice
        })
        // 把总价返回
        return total
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        if (!this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return !this.fold
      }
    },
    methods: {
      drop (el) {
        for (var i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      empty() {
        for (var i = 0; i < this.selectFoods.length; i++) {
          this.selectFoods[i].count = 0
        }
      },
      // 关闭购物车列表
      hideList() {
        this.fold = true
      },
      // 购物车列表折叠函数
      toggleList() {
        if (this.totalCount === 0) {
          return
        }
        this.fold = !this.fold
      },
      // 订单确认页显示
      orderShow() {
        this.$refs.order.show()
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .shopcart
    height: 65px
    width: 100%
    position: fixed
    z-index: 100
    left: 0
    bottom: 0
    padding: 10px 0px 15px 0px
    box-sizing: border-box
    .priceBox
      width: 100%
      padding: 0 10px
      display: flex
      position: relative;
      z-index: 60;
      box-sizing: border-box
      background: #000;
      .priceBox-left
        flex: 1
        .productNum
          width: 56px
          height: 56px
          display: inline-block
          vertical-align: top
          position: relative
          box-sizing: border-box
          border-radius: 50%
          background: url(car.png) no-repeat
          text-align: center
          i
            position: absolute
            right: 0
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 12px 12px
            font-size: 9px
            font-weight: 700
            color: #fff
            background-color: #e4a641
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            font-style: normal
        .totalMon
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255, 255, 255)
      .priceBox-right
        flex: 0 0 117px
        height: 50px
        .confirm
          height: 100%
          padding: 0 10px
    .ball-content
      .ball
        z-index: 200
        position: fixed
        left: 32px
        bottom: 22px
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background-color: #f19e38
        transition: all 0.4s linear
    /*购物车列表*/
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: 20
      width: 100%
      padding: 0px 10px 10px 10px
      box-sizing: border-box
      transform: translate3d(0, -100%, 0)
      .shopcart-list-bg
        width: 100%
        padding: 0 16px
        border-radius: 20px 20px 20px 20px
        box-sizing: border-box
        background: #fff
    .fold-enter-active
      transition: all 0.6s cubic-bezier(.23,1,.32,1)
    .fold-leave-active
      transition: all 0.6s cubic-bezier(.23,1,.32,1)
      transform: translate3d(0, 100%, 0)
    .fold-enter, .fold-leave-active
      transform: translate3d(0, 0, 0)
    .list-header
      width: 100%
      height: 30px
      line-height: 30px
      padding: 16px 0
      position: relative
      .title
        padding-left: 20px
        position: relative
        font-size: 14px
        color: #000000
        &:before
          z-index: 1000
          content: ''
          position: absolute
          left: 0
          top: 5px
          bottom: 0
          right: auto
          width: 8px
          height: 20px
          line-height: 30px
          color: #fa3232
          font-size: 15px
          text-align: left
          background: #000
    .list-content
      width: 100%
      overflow: hidden
      ul
        li
          position: relative
          padding-bottom: 20px
          display: flex
          .dishesImg
            flex: 0 0 106px
            width: 106px
            height: 79px
            position: relative
            background-image: url(dishes.png)
            background-size: 100% 100%
            .dinner
              margin 0 auto
              width: 102px
              height 72px
          .dishesInfo
            flex: 1
            padding-left: 20px
            h5
              margin: 2px 0 8px 0px
              font-size: 14px
              line-height: 14px
              color: rgb(7, 17, 27)
            p, p i
              font-style: normal
              font-weight bold
              font-size: 14px
            .primeCost
              text-decoration: line-through
              color: #878787
              font-size: 14px
            .alarm
              font-size: 0.1rem
              color: #f19e38
          .cartnum-wrapper
            position: absolute
            right: 0
            bottom: 18px
    /* 模糊背景 */
    .list-mask
      width: 100%
      position: fixed
      top: 0
      left: 0
      bottom: 65px
      z-index: 10
      opacity: 1
      backdrop-filter: blur(10px)
      background-color: rgba(7, 17, 27, 0.8)
    .fade-enter-active
      transition: all .5s
    .fade-leave-active
      transition: all .5s
    .fade-enter, .fade-leave-active
      transition: all .5s
      background: rgba(7, 17, 27, 0)
      opacity: 0
</style>

