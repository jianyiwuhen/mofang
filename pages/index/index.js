//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '首页',
    userInfo: {},
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
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
    //设置当前位置
    var that = this;
    var adIn=setInterval(function(){
      if (app.globalData.address!=undefined){
        that.setData({
          address: app.globalData.address
        })
        clearInterval(adIn)
      }
    },1000)
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
    wx.navigateTo({
      url: '../houseList/houseList'
    })
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
  //扫一扫方法
  findSys:function(){
    wx.scanCode({
      success: function (result, scanType, charSet, path){
      }
    })
  },
  onShareAppMessage: function () {

  }

})
