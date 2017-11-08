const app = getApp()
// pages/mfIndex/mfIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     orderList:[
        {
         name: "CoCo都可",
         img: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
         orderTime:'2017-11-08 13:56',
         orderMoney:'15',
         status:"1",
         goods:[{
            goodsName:'白菜',
            price:'10'
         }, {
           goodsName: '白菜1',
           price: '12'
         }]
       }, {
         name: "CoCo都可",
         img: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
         orderTime: '2017-11-08 13:56',
         orderMoney: '15',
         status: "2",
         goods: [{
           goodsName: '白菜',
           price: '10'
         }, {
           goodsName: '白菜1',
           price: '12'
         }]
       }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '订单' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      screenHeight: app.globalData.systemInfo.windowHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  toNearPage: function () {
    wx.redirectTo({
      url: '../near/near'
    })
  },
  toMyPage: function () {
    wx.redirectTo({
      url: '../my/my'
    })
  },
  toOrderPage: function () {
    wx.redirectTo({
      url: '../order/order'
    })
  },
  toIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})