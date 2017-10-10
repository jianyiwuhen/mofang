const app = getApp()

Page({
  data:{
    marks:[]
  }, onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
    this.getCenterLocation()
    this.moveToLocation()
    //this.includePoints()

  },
  onShareAppMessage: function (res) {

    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
    }
  }, 
  //获取当前位置
  getCenterLocation: function () {
    var that=this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.longitude = res.longitude
        that.latitude = res.latitude
        that.translateMarker()
      }
    })
  },
  //移动位置
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  //平移marker，带动画
  translateMarker: function () {
    var that=this
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000
    })
  }, 
  //缩放视野展示所有经纬度	
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 31.2443500000,
        longitude: 121.4899400000,
      }, {
          latitude: 31.2447829588,
          longitude: 121.4855718613,
        }, {
          latitude: 31.2483602503,
          longitude: 121.4842200279,
        }]
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '地图' })
  }


})