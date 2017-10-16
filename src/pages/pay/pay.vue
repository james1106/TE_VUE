<script src="../../../../../wordProject/TE_project/src/config/service.js"></script>
<template>
  <div class="pay">
    <div class="pay-layout">
      <div class="amountPayable">
        <p class="amountPayable-title">应付金额</p>
        <p class="amountPayable-money">￥{{payPrice}}</p>
      </div>
      <h4>请选择支付方式</h4>
      <div class="payWay">
        <ul>
          <li>
            <div class="icon"></div>
            <div class="payWay-list"></div>
            <div class="payWay-check"></div>
          </li>
        </ul>
      </div>
      <div class="pay-ok">
        <div>
          <img class="img-responsive" src="./bg05.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        payPrice: 0
      }
    },
    created() {
      this.payPrice = this.$route.params.payPrice
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .pay
    width: 100%
    overflow: hidden
    .pay-layout
      padding: 0 10px
      .amountPayable
        padding: 10px 0
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 10px
        display: flex
        background: #fff
        .amountPayable-title
          padding-left: 10px
          flex: 1
          font-size: 12px
          text-align: left
          font-weight: bold
          color: #000
        .amountPayable-money
          padding-right: 10px
          flex: 1
          font-size: 12px
          text-align: right
          color: #e4a641
      h4
        padding: 20px 0
        font-size: 14px
        color: #fff
      .payWay
        padding: 20px 0
        margin-bottom: 20px
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 10px
        background: #fff
        li
          border-bottom: 10px
      .pay-ok
        width: 100%
</style>
