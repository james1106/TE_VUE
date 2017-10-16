<template>
<div class="cartnum">
	<transition name="decrease">
		<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"><i class="icon-remove_circle_outline"></i></div>
	</transition>
	<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
	<transition name="add">
		<div class="cart-add" @click.stop.prevent="addCart($event)"><i class="icon-add_circle"></i></div>
	</transition>
</div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      this.food.count--
    }
  }
}
</script>

<style lang="stylus" type="text/stylus">
.cartnum
  .cart-decrease,.cart-add
    width:30px
    height:30px
    line-height: 18px
    padding: 5px 5px
    border-radius: 50%
    display: inline-block
    font-size: 12px
    color: #f19e38
    text-align: center
   .cart-decrease i,.cart-add i
     font-size: 30px
     background: #fff
   .cart-count
      width: 16px
      height:30px
      line-height: 30px
      padding: 5px 0
      display: inline-block
      font-size: 14px
      color: rgb(0,0,0)
      text-align: center
      vertical-align: top
  .decrease-enter-active
    animation: decrease .5s linear
    @keyframes decrease
     0%
       opacity:0
	   transform:rotate(0)
	 100%
	   opacity:1
	   transform:rotate(-180deg)
</style>
