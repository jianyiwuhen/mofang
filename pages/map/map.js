const app = getApp()

Page({
  data:{
    markers: [{
      latitude: 31.2443500000,
      longitude: 121.4899400000,
      callout:{
        content:'圣诞节快乐分手的距离福建省地方水电开发经理',
        display:'BYCLICK',
        borderRadius:'10',
        padding:10,
        color:'#000'
        
      }
    }]

  }, onReady: function (e) {

    this.data.latitude=app.globalData.latitude
    this.data.longitude=app.globalData.longitude
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
    this.getCenterLocation()
    this.moveToLocation()
    //this.translateMarker()
    this.includePoints()
    wx.openLocation({
      latitude: 31.2443500000,
      longitude: 121.4899400000,
      name:"测试",
      success:function(){
        
      }
    })
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
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
      }]
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '地图' })
  }


})