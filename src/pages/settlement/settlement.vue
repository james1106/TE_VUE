<template>
  <div class="settlement">
    <div class="settlement-layout">
      <div class="settlement-layout-header">
        <h4>你的订单:</h4>
        <div class="settlement-list">
            <ul>
              <li v-for="item in selectFoods"><div class="foodName f-bold">{{item.pname}}</div><div class="foodPart f-tc f-bold">{{item.count}}/份</div><div class="price f-bold">￥{{item.nprice}}</div></li>
            </ul>
        </div>
      </div>
      <div class="settlement-layout-foot">
        <div class="money">
          <p class="f-bold">消费金额： ￥{{amountprice}}</p>
          <p v-if="discount" class="f-bold">优惠金额： ￥{{discount}}</p>
          <p class="amountPayable f-bold">应付金额： ￥{{payPrice}}</p>
        </div>
        <div class="pay">
          <div @click="pay">
            <img src="./bg04.png"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        peopleNum: [],
        selectFoods: [],
        discount: 10,
        payPrice: 0,
        amountprice: 0
      }
    },
    created () {
      this.peopleNum = this.$route.params.peopleNum
      this.selectFoods = JSON.parse(decodeURIComponent(this.$route.params.selectFoods))
      if (!this.selectFoods) {
        // 防止刷新路由空值报错
        return false
      } else {
        this.mustAmount()
      }
    },
    computed: {
    },
    methods: {
      mustAmount() {
        // 应付金额
        let totalprice = 0
        this.selectFoods.forEach((food) => {
          totalprice += food.count * food.nprice
        })
        this.amountprice = totalprice
        if (this.discount) {
          this.payPrice = totalprice - this.discount
        } else {
          this.payPrice = totalprice
        }
      },
      pay () {
        this.$router.push({name: 'pay', params: {payPrice: this.payPrice}})
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .settlement
    height: 100%
    overflow: hidden
    .settlement-layout
      padding: 0 10px
      .settlement-layout-header
        width: 100%
        min-height: 100%
        h4
          height: 30px
          line-height: 30px
          color: rgb(255,255,255,.5)
          text-align: left
        .settlement-list
          padding: 20px 10px
          border-radius: 10px
          overflow: hidden
          background: rgba(255,255,255,1)
          li
            display: flex
            padding-bottom: 15px
            .foodName
              flex: 1
            .foodPart
              flex 1
              font-size: 14px
            .price
              flex:1
              text-align: right
              color: #e4a641
      .settlement-layout-foot
        width: 100%
        padding: 10px 0 0 0
        overflow: hidden
        .money
          p
            padding-bottom: 10px
            font-size: 14px
            text-align: right
            color: #f59622
          .amountPayable
            font-size: 16px
            color: #fff
        .pay
           width: 100%
           div
             img
               width 100%


</style>
