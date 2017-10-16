<template>
	<div class="order" v-show="oderflag">
		<div @click="hide" class="back-order"><img class="img-responsive" src="./back.png" alt=""></div>
		<div class="order-layout" >
			<div class="order-list" ref="order">
				<ul>
					<li v-for="item in selectFoods">
            <div class="food-tp">
              <div class="food-title f-blo">{{item.pname}}</div>
              <div class="food-price">￥{{item.nprice}}/份</div>
            </div>
            <div class="food-cartnum">
              <div class="cartnum-wrapper">
                <cartnum :food="item"></cartnum>
              </div>
            </div>
					</li>
				</ul>
			</div>
			<div class="price">
				应付金额：￥{{totalPrice}}
			</div>
			<div class="down-order" @click="downOrder">
        <img class="img-responsive" src="./order-down.png" alt="">
      </div>
		</div>
    <!--商品已经清空，点击返回-->
		<transition name="out">
			<div class="outprompt" v-show="outflag">
		  		<div class="outprompt-box">
		  			<div class="outprompt-box-text">
		  				<ul>
		  					<li></li>
		  					<li @click="hide">{{outprompt}}</li>
		  				</ul>
		  			</div>
		  		</div>
			</div>
		</transition>
    <!--选择就餐人数-->
		<!--<transition name="out">-->
        <div class="numMeals-box-num" v-show="numMeals">
          <h4>选择就餐人数</h4>
          <div class="numMeals-peopleNum">
            <input type="text" :value = "peopleNum" class="peopleNum-int"/>
          </div>
          <div class="numMeals-peopleNum-num">
            <ul>
              <li v-for = "(item,index) in numberMeals" @click.stop.prevent = "peopleNumIndex(index)"><img class="img-responsive" src="./order_num_bg.png" alt=""><span>{{item}}</span></li>
            </ul>
          </div>
          <div class="button-ok"><div class="ok"  @click.stop.prevent="ok"><img class="img-responsive" src="./order_ok.png" alt=""></div></div>
        </div>
		<!--</transition>-->
    <!--模糊背景-->
    <transition name="fade">
      <div v-show="numMeals" @click="hidden" class="list-mask"></div>
    </transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import cartnum from '@/components/cartnum/cartnum'

export default {
  props: {
    selectFoods: {
      type: Array
    }
  },
  data() {
    return {
      oderflag: false,
      outflag: false,
      numMeals: false,
      numberMeals: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      peopleNum: 0
    }
  },
  components: {
    cartnum
  },
  computed: {
    totalPrice() {
      // 一个可变的变量，点击的数量乘以价格
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.count * food.nprice
      })
      // 把总价返回
      return total
    },
    outprompt() {
      // 一个可变的变量，点击的数量乘以价格
      let sunPrice = 0
      this.selectFoods.forEach((food) => {
        sunPrice += food.count * food.nprice
      })
      if (sunPrice === 0) {
        this.outflag = true
        return '亲，没有订单了，请去下单'
      }
    }
  },
  methods: {
    // 显示订单详情页
    show () {
      if (this.selectFoods.length === 0) {
        return false
      }
      this.outflag = false
      this.oderflag = true
      // 载入 better-scroll
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.order, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.oderflag = false
      this.outflag = false
    },
    hidden () {
      this.numMeals = false
    },
    downOrder() {
      this.numMeals = true
    },
    peopleNumIndex(index) {
      this.peopleNum = this.numberMeals[index]
    },
    ok() {
      this.numMeals = false
      this.$router.push({name: 'settlement', params: { selectFoods: JSON.stringify(this.selectFoods), peopleNum: this.peopleNum }})
    }
  },
  created() {
  }
}
</script>

<style lang="stylus" type="text/stylus">
.order
  width: 100%
  position: fixed
  left: 0
  top: 0
  bottom:0px
  z-index: 100
  padding:10px
  box-sizing: border-box
  background: #000
  .order-layout
    .order-list
      width: 100%
      height: auto
      max-height: 300px
      padding: 20px 0 30px 0
      border-radius: 20px
      box-sizing:border-box
      background: #fff
      overflow: hidden
      ul li
        display:flex
        padding:10px 10px 5px 10px
        line-height: 30px
        box-sizing:border-box
        .food-tp
          flex: 1
          display: flex
          .food-title
            flex: 1
          .food-price
            flex: 1
            font-size: 16px
            color: #e4a641
            text-align: center
        .food-cartnum
          flex: 0 0 120px
          width: 120px
          position: relative
          .cartnum-wrapper
            position: absolute
            top: -5px
            right: 0
    .price
      width: 100%
      height: 50px
      line-height: 50px
      padding: 20px 0
      font-size: 16px
      color: #fff
      text-align:right
      font-weight: bold
  .back-order
    width: 100%
    margin-bottom: 10px
    position: relative
  .outprompt
    width:100%
    position: fixed
    top: 0
    left: 0
    bottom: 0
    z-index: 101
    background: rgba(0,0,0,.4)
    .outprompt-box
      width: 100%
      height: 100%
      position: relative
      .outprompt-box-text
        width: 80%
        height: 50%
        position: absolute
        top: 50%
        left: 50%
        margin-left: -40%
        margin-top: -50%
        border-radius: 20px
        background: #fff
        li
          width: 100%
          &:nth-child(1)
            height: 150px
          &:nth-child(2)
            height: 50px
            line-height: 50px
            border-radius: 50px
            text-align: center
            color: #000
            background: rgba(245,135,46,.5)
  .out-enter-active
    transition: all 0.4s linear
  .out-leave-active
    transition: all 0.4s linear
  .out-enter,.out-leave-active
    transform: translate3d(0, -100%, 0);
  .numMeals-box-num
    z-index: 12
    position: absolute
    top: 50%
    left: 50%
    margin-left: -40%
    margin-top: -180px
    padding: 20px 30px
    width: 80%
    border-radius: 20px
    box-sizing: border-box
    background: #fff
    h4
      height: 50px
      line-height: 50px
      text-align: center
      font-weight bold
    .numMeals-peopleNum
      width: 100%
      height: 50px
      .peopleNum-int
        width: 200px
        height: 30px
        line-height: 30px
        margin:0 auto
        border: 1px solid #ccc
        display: block
        cursor: none
    .numMeals-peopleNum-num
      width: 100%
      overflow:hidden
      ul
        overflow hidden
        li
          position: relative
          width: 33%
          padding: 10px
          float: left
          box-sizing: border-box
          span
            position:absolute
            top: 50%
            left: 50%
            margin-top: -10%
            margin-left: -10%
            font-size: 16px
            font-weight: bold
    .button-ok
      padding 0 10px
  /* 模糊背景 */
  .list-mask
    width: 100%
    position: fixed
    top: 0
    left: 0
    bottom: 0
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
