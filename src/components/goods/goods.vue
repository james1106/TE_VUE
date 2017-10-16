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
        goods: [],
        scrollY: 0,
        listHeight: [],
        config: config,
        language: 0,
        selectedFood: {} // 当前选中的食品详情
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
</style>
