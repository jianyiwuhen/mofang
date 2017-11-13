//app.js

App({
  onLaunch: function () {
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
              //获取当前位置
             // this.getLocation()
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
    var that=this
    //获取屏幕信息
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res
      }
    })
    this.loadCity()
  },
  globalData: {
    userInfo: null,
    domain:'https://ljwxsmall1.com.cn:8080',
    address:'',
    baiduAk:'EjKYHmC3hj9ezfw9maDwgRyY5lPIoYK5',
    appid:'wx2b738a908bec3d75',
    secret:'36b7c03afc38ab473ee00bca135d69c2'

  },
  //获取当前位置
  getLocation:function(){
    var that=this;

  /*  wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.globalData.latitude = res.latitude
        that.globalData.longitude= res.longitude
        that.loadCity(res.longitude, res.latitude)
      }
      })*/
  },
  loadCity: function (longitude, latitude) {
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder?address=黄浦区人民大道200号&output=json&key=' + that.globalData.baiduAk+'&city=上海市',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      method:'get',
      success: function (res) {
        
      }
    })
  }

})