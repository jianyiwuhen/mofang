//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.getLocation()
  },
  globalData: {
    userInfo: null,
    domain:''
  },
  //获取当前位置
  getLocation:function(){
    var that=this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.globalData.latitude = res.latitude
        that.globalData.longitude= res.longitude
        that.loadCity(res.longitude, res.latitude)
      }
      })
  },
  loadCity: function (longitude, latitude) {
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=EjKYHmC3hj9ezfw9maDwgRyY5lPIoYK5&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.addressComponent.city
        that.globalData.cityName = city
      }
    })
  }

})