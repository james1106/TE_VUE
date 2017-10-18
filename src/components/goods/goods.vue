<template>
  <div class="goods">
    <div class="goods-wrapper">
      <div class="menu-wrapper" ref="menuwrapper">
        <ul>
          <li class="f-tc f-bold menu-list" :class="{'active':currentIndex==index}" v-for="(item,index) in goods"
              @click="selectMenu(index)">{{ languageActive == 0 ? item.cname : item.en_cname}}
          </li>
          <!--<li>-->
          <!--<div class="hideDishes f-center"></div>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapperList">
        <ul class="foods-wrapper-list-foods">
          <li class="foods-wrapper-list-foods-class food-list-hook" v-for="foods in goods">
            <ul>
              <li @click="selectFood(foodList,$event)" v-for="(foodList,indexF) in foods.foods">
                <div class="dishesImg">
                  <div class="new f-blo"></div>
                  <img :src="foodList.images[0].min" class="dinner f-blo"/>
                </div>
                <div class="dishesInfo">
                  <h5 class="f-bold">{{ languageActive == 0 ? foodList.pname : foodList.en_pname }}</h5>
                  <p><i>￥</i>{{foodList.nprice}}/份 <span class="primeCost">￥{{foodList.oprice}}</span></p>
                  <span class="alarm"></span>
                </div>
                <div class="cartnum-wrapper">
                  <cartnum :food="foodList" @add="addFood"></cartnum>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="m-code" @touchstart="touchStart($event)" @touchmove="touchMove($event)"
         @touchend="touchEnd($event)" @click="showMask = true"></div>

    <!--模糊背景-->
    <transition name="fade">
      <div v-show="showMask" @click="showMask = false" class="list-mask"></div>
    </transition>

    <transition name="fade">
      <div v-show="showMask" class="modal modal-in">
        <div class="modal-inner">
          <div class="modal-title">同桌点餐要输入</div>
          <div class="modal-text">
            <div class="m-code-box-main">
              <div><span class="z-code">1</span></div>
              <div><span class="z-code">2</span></div>
              <div><span class="z-code">3</span></div>
              <div><span class="z-code">4</span></div>
            </div>
          </div>
        </div>
        <div class="modal-buttons modal-buttons-1 ">
          <span class="modal-button">
            <div class="m-code-but">
              <div @click="showMask = false" class="m-code-buttom-main">
              </div>
            </div>
          </span>
        </div>
      </div>
    </transition>

    <v-shopcart ref="shopcart" :selectFoods="selectFoods" :languageActive="languageActive"></v-shopcart>
    <!-- 食品详情页 -->
    <food :food="selectedFood" @add="addFood" :languageActive="languageActive" ref="food"></food>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart.vue'
  import cartnum from '@/components/cartnum/cartnum'
  import food from '@/components/food/food'
  import config from '../../config/service'

  const DATA_OK = 0

  export default {
    props: {
      languageActive: {
        type: Number
      }
    },
    data() {
      return {
        showMask: false,
        goods: [],
        scrollY: 0,
        listHeight: [],
        config: config,
        language: 0,
        selectedFood: {}, // 当前选中的食品详情
        pageX: 0,
        pageY: 0,
        moveX: 0,
        moveY: 0,
        offsetX: 0,
        offsetY: 0
      }
    },
    created() {
      this.$http.get('/goods', {
        params: {
          sid: 1
        }
      }).then(response => {
        response = response.body
        console.log(response)
        if (response.errcode === DATA_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this.isScroll()
            this.calcHeight()
          })
        }
      })
    },
    components: {
      'v-shopcart': shopcart,
      cartnum,
      food
    },
    computed: {
      currentIndex() {
        // 监听滚轮的变化，滚轮所在的范围符合哪一块菜品类别下
        for (var i = 0; i < this.listHeight.length - 1; i++) {
          var height1 = this.listHeight[i]
          var height2 = this.listHeight[i + 1]
          if (this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
      },
      selectFoods() {
        var foods = []
        this.goods.forEach(function (good) {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      touchStart(e) {
        this.pageX = e.touches[0].pageX
        this.moveX = this.offsetX
        this.pageY = e.touches[0].pageY
        this.moveY = this.offsetY
      },
      touchMove(e) {
        let moveX = e.targetTouches[0].pageX - this.pageX
        this.offsetX = moveX + this.moveX
        let moveY = e.changedTouches[0].pageY - this.pageY
        this.offsetY = moveY + this.moveY
        let dom = document.querySelector('.m-code')
        this.$nextTick(function () {
          dom.style.transform = `translate3d(${this.offsetX}px, ${this.offsetY}px, 0px)`
        })
      },
      touchEnd(e) {

      },
      isScroll() {
        this.couponscroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        })
        this.listscroll = new BScroll(this.$refs.foodsWrapperList, {
          probeType: 3,
          click: true
        })
        this.listscroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      selectMenu(index) {
        // 派生的点击事件,解决两次点击事件
        // 点击左边类名滚到对应类名下的菜品
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapperList.getElementsByClassName('food-list-hook')
        // 找到当前点击的对象
        let el = foodList[index]
        this.listscroll.scrollToElement(el, 300)
      },
      calcHeight() {
        // 把所有的类别菜品的高度放到数组中
        var foodList = this.$refs.foodsWrapperList.getElementsByClassName('food-list-hook')
        var height = 0
        this.listHeight.push(height)
        for (var i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
      },
      // 进入食品详情页
      selectFood(food, event) {
        // 解决移动端响应两次点击事件的问题
        if (!event._constructed) {
          return
        }
        // 把当前食物信息赋给 => selectedFood
        this.selectedFood = food
        this.$refs.food.show()
      },
      addFood(target) {
        this._drop(target)
      },
      _drop(target) {
        // 异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .goods
    width: 100%
    position: absolute
    top: 112px
    left: 0
    bottom: 115px
    padding: 0 10px
    box-sizing: border-box
    overflow: hidden
    .goods-wrapper
      width: 100%
      height: 100%
      display: flex
      overflow: hidden
      .menu-wrapper
        flex: 0 0 61px
        width: 61px
        overflow: hidden
        ul li
          margin-bottom: 10px
          line-height: 42px
          font-size: 16px
          color: #fff
        .active
          background-image: url(choice.png)
          background-size: 100% 100%
          color: #040404
        .hideDishes
          height: 100%
          width: 100%
          background-image: url(hideDishes.png)
          background-size: 100% 100%
      .foods-wrapper
        flex: 1
        position: relative
        background: #fff
        .foods-wrapper-list-foods
          width: 100%
          padding: 0 10px 0px 10px
          box-sizing: border-box
          li
            ul
              padding-top: 20px
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
                background-size: 106px 79px
                .new
                  position: absolute
                  z-index: 2
                  width: 24px
                  height: 28px
                  right: -10px
                  top: -10px
                  background-image: url(new.png)
                  background-size: 24px 28px
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
                  font-size: 14px
                  font-weight bold
                  font-style normal
                .primeCost
                  text-decoration: line-through
                  color: #878787
                  font-size: 12px
                .alarm
                  font-size: 0.1rem
                  color: #f19e38
              .cartnum-wrapper
                position: absolute
                right: 0
                bottom: 18px

    .m-code
      position: absolute
      right: 20px
      bottom: 80px
      width: 60px
      height: 60px
      border-radius: 50%
      z-index: 2
      color: #f2f2f2
      background: url(codebg.png)
      background-size: 100% 100%
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
    .fade-enter, .fade-leave-to
      opacity: 0
      transform: translate3d(0,0,0) scale(1.185)
    .modal
      width: 270px
      position: absolute
      z-index: 13500
      left: 50%
      margin-left: -135px
      margin-top: -80px
      top: 50%
      text-align: center
      border-radius: 13px
      overflow: hidden
      color: #000
      background: url(alertbg.png)
      background-size: 100% 100%
      .modal-inner
        background: none
        padding: 15px 15px 0 15px
        .modal-title
          font-weight: 600
          font-size: 18px
          text-align: center
        .modal-text
          margin-top: 5px
          .m-code-box-main
            display: flex
            padding: 10px 10px 10px 20px
            box-sizing: border-box
            div
              flex: 1;
              padding-right: 10px;
              .z-code
                display: inline-block
                width: 100%
                height: 35px
                line-height: 35px
                background: url(order_num_bg.png)
                background-size: 100% 100%
                text-align: center
                font-size: 14px
                font-weight: bold
      .modal-buttons
        height: 44px
        position: relative
        display: flex
        justify-content: center
        padding: 15px 0 15px 0
        .modal-button
          width: 100%;
          padding: 0 5px;
          height: 44px;
          font-size: 17px;
          line-height: 44px;
          text-align: center;
          color: #007aff;
          display: block;
          position: relative;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
          box-sizing: border-box;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          background: rgba(255,255,255,.95);
          .m-code-but
            padding: 0 30px
            box-sizing: border-box
            .m-code-buttom-main
              height: 32px
              background: url(guige-confirm.png)
              background-size: 100% 100%


</style>
