export default {
  api: {
    /**
     * 菜品接口
     * 参数:  sid=1  comid=1  //店铺ID 品牌ID
     * type   //APP点餐才需要传,为type=app
     * 请求类型: post/get
     * 返回数据类型: json格式
     * */
    goods: '/kyapi/index.php?controller=product&action=productList',
    /**
     * 用户信息接口
     * 参数:  openid  用户id
     * appid  公众号id
     * 请求类型: post/get
     * 返回数据类型: json格式
     * */
    userinfo: '/kyapi/index.php?controller=wxdeal&action=userInfo',
    /**
     * 门店信息接口
     * 参数:
     * sid=1  //店铺ID
     * Type  //点菜平台，默认微信，可以不传，APP端需要传type=app
     * 请求类型: post/get
     * 返回数据类型: json格式
     * */
    storeinfo: '/kyapi/index.php?controller=store&action=storeInfo',
    /**
     * 获取关联菜品接口
     * pid  单个菜品pid(多个菜品用json格式传数组)
     * type 单个菜品获取关联菜品，可不传；多个菜品必传，值为2
     * source   APP下单要传，其余不用
     * 请求类型: post/get
     * 返回数据类型: json格式
     */
    relategoods: '/kyapi/index.php?controller=product&action=getRelatedProduct'
  }
}
