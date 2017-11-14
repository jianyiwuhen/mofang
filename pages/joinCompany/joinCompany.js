const app = getApp()
var bmap = require('../lib/bmap-wx.min.js'); 
var utils = require('../../utils/util.js'); 
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
    phoneStatu:1,
    mapStatus:true,
    phoneTime:60

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
       mapLat:app.globalData.latitude,
       mapLng:app.globalData.longitude,
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
    var that=this;
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
                   that.setData({
                     phoneStatu:2,
                   })
                   //时间倒计时
                  var ti= setInterval(function(){
                    var phoneTime = that.data.phoneTime-1;
                    if (phoneTime==0){
                      that.setData({
                        phoneStatu: 1,
                        phoneTime:60
                      })
                    }else{
                      that.setData({
                        phoneTime: phoneTime
                      })
                    }
                  },1000)
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
      var key = Math.random().toString(15).substr(2);
      //选择图片
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const tempFilePath = res.tempFilePaths[0]
          //获取上传TOKEN
          wx.request({
            url: app.globalData.domain + "/company/getQiniuToken",
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'get',
            success: function (data) {
                   //上传图片
                  wx.uploadFile({
                      url: 'https://up.qbox.me',
                      filePath: tempFilePath,
                      name: 'file',
                      formData: {
                          'token': data.data,//刚刚获取的上传凭证
                          'key': key//这里是为文件设置上传后的文件名
                      },
                      success: function (r) {
                        if (JSON.parse(r.data).key!=undefined){
                          wx.showToast({
                            title: '上传成功',
                            duration: 2000,
                            mask: true
                          })
                          that.setData({
                            uploadImg: app.globalData.imgUrl + JSON.parse(r.data).key
                          })
                        }

                       },
                  fail: function (res) {
                      console.log(res)
                  }
                })
            }
          })
          
        }
      })
  },
  //百度地图检索
  bindKeyInput: function (e) {
    if (e.detail.value.length < 8 || e.detail.value.length%2!=0){
      return;
    }
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
      if (data.result.length==0){
        that.setData({
          mapStatus:true,
          sugData: [],
        });
      }else{
        that.setData({
          sugData: data.result,
          mapStatus: false
        });
      }

    }
    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: app.globalData.cityName,
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  //选择地址
  chooseAddress:function(e){
    this.setData({
      sugData: [],
      mapStatus: true,
      mapLat: e.target.dataset.lat,
      mapLng: e.target.dataset.lng,
      address: e.target.dataset.address,
      markers: [{
        latitude: e.target.dataset.lat,
        longitude: e.target.dataset.lng,
        callout: {
          content: e.target.dataset.address,
          display: 'BYCLICK',
          borderRadius: '10',
          padding: 10,
          color: '#000'
        }
      }]
    });
  },
  getCompanyName:function(){
     this.setData({
       companyName: e.detail.value
     })
  },
  getPhoneCode:function(){
    this.setData({
      phoneCode: e.detail.value
    })
  },
  //新建商家
  newCompany:function(){
   
    
  } 
})