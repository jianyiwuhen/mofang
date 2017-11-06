//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '首页',
    userInfo: {}
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '首页' })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    setTimeout(function () {
      that.setData(
        {
          address: app.globalData.address
        }
      )
    }, 3000)
  },
  onReady: function () {

    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toMfIndex:function(){
     setTimeout(function(){
       wx.navigateTo({
         url: '../houseList/houseList'
       })
     },1000)
  },
  toMap:function(){
    wx.navigateTo({
      url: '../map/map'
    })
  },
  toNearPage:function(){
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
  onShareAppMessage: function () {

  }
})
