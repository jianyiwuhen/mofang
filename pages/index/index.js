//index.js
//获取应用实例
const app = getApp()
var bmap = require('../lib/bmap-wx.min.js'); 
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
    duration: 1000,
    companyList:[
        {
          name:"CoCo都可",
          position:500,
          pingfen:4.5,
          monthYd:100,
          img:'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg'
        },
        {
          name: "CoCo都可",
          position: 500,
          pingfen: 4.5,
          monthYd: 100,
          img: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg'
        }, {
          name: "CoCo都可",
          position: 500,
          pingfen: 4.5,
          monthYd: 100,
          img: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg'
        }, {
          name: "CoCo都可",
          position: 500,
          pingfen: 4.5,
          monthYd: 100,
          img: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg'
        },
        {
          name: "CoCo都可",
          position: 500,
          pingfen: 4.5,
          monthYd: 100,
          img: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg'
        }, {
          name: "CoCo都可",
          position: 500,
          pingfen: 4.5,
          monthYd: 100,
          img: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg'
        }

    ],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../images/normal.png',
    selectedSrc: '../images/selected.png',
    halfSrc: '../images/half.png'
  },
  onLoad: function () {
    setTimeout(function(){
      wx.navigateTo({
        url: '../joinCompany/joinCompany'
      },2000)
    })
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
    //百度地图获取当前位置
    var that = this;
    
    var BMap = new bmap.BMapWX({
      ak: app.globalData.baiduAk
    }); 
    BMap.regeocoding({
      fail: function (data) {
        console.log(data);
      },
      success: function (data) {
        //返回数据内，已经包含经纬度    
        var ad = data.originalData.result;
          that.setData({
            address: ad.formatted_address.replace(ad.addressComponent.province, '')
          })
          app.globalData.address = ad.formatted_address
          app.globalData.latitude = data.wxMarkerData[0].latitude
          app.globalData.longitude = data.wxMarkerData[0].longitude
          app.globalData.cityCode = ad.cityCode
          app.globalData.cityName=ad.addressComponent.province
        //把所有数据放在初始化data内    

      }     
    })
  },
  onReady: function () {
    this.setData({
      screenHeight: app.globalData.systemInfo.windowHeight
    })
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

  },
  refresh:function(){
   console.log('aa')
  },
  more:function(){
    console.log('bb')
  },
  //联系商家
  callCompany:function(){
   console.log('aa')
  },
  //导航
  navigateMap:function(){
    console.log('bb')
  },
  toCompany:function(){
    wx.navigateTo({
      url:'../company/company?id=1'
    })
  }
/*  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    this.setData({
      key: key
    })

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    this.setData({
      key: key
    })
  }*/

})
