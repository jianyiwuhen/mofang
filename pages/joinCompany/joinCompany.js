const app = getApp()
var bmap = require('../lib/bmap-wx.min.js'); 
// pages/mfIndex/mfIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    foodType: [{
      typeName:'美食',
      typeId:1
    }, {
      typeName: '饮料',
      typeId:2
      }, {
        typeName: '水果',
        typeId: 3
      }],
    index: 0,
    phoneStatu:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '注册商家' })
    var that = this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     this.setData({
       address: app.globalData.address,
       latitude:app.globalData.latitude,
       longitude:app.globalData.longitude,
       markers: [{
         latitude: app.globalData.latitude,
         longitude: app.globalData.longitude,
         callout: {
           content: app.globalData.address,
           display: 'BYCLICK',
           borderRadius: '10',
           padding: 10,
           color: '#000'
         }
       }]
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindPickerChange:function(e){
      this.setData({
        index: e.detail.value
      })
  },
  //获取验证码
  phoneSubmit:function(){
    var regTel = /^0?1[3|4|5|8|9|2|6|7][0-9]\d{8}$/;
    if(regTel.test(this.data.phoneNum)){
           wx.request({
             url: app.globalData.domain +"/company/sendShortNum" ,
             data: {
               phoneNum: this.data.phoneNum
             },
             header: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             method: 'post',
             success:function(data){
                 console.log(data);
             }
           })
    }else{
      wx.showToast({
        title:'电话号码错误',
        duration:2000,
        mask:true,
        image:'../images/error.png'
      })
    }

  },
  //获取手机号码并验证
  getPhoneNum:function(e){
    this.setData({
      phoneNum:e.detail.value
    })

  },
  uploadImg:function(){
      var that = this

      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const tempFilePath = res.tempFilePaths[0]
          console.log(tempFilePath)
         
        }
      })
  },
  //百度地图检索
  bindKeyInput: function (e) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: app.globalData.baiduAk
    }); 
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var sugData = '';
      for (var i = 0; i < data.result.length; i++) {
        sugData = sugData + data.result[i].name + '\n';
        if(i>5) break;
      }
      that.setData({
        sugData: sugData
      });
    }
    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: app.globalData.cityName,
      city_limit: true,
      fail: fail,
      success: success
    });
  } 
})