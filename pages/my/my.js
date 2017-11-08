const app = getApp()
// pages/mfIndex/mfIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     moneyBag:0.00,
     yhTicket:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
    console.log(app.globalData.userInfo)
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