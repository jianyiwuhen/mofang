const app = getApp()
const device = app.globalData.systemInfo
const W = device.windowWidth
const H = device.windowHeight - 50
let cropper = require('../welCropper/welCropper.js');
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
    // 初始化组件数据和绑定事件
    cropper.init.apply(that, [W, H]);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

          // 将选取图片传入cropper，并显示cropper
          // mode=rectangle 返回图片path
          // mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction
          let modes = ["rectangle", "quadrangle"]
          let mode = modes[0]   //rectangle, quadrangle
          that.showCropper({
            src: tempFilePath,
            mode: mode,
            sizeType: ['original', 'compressed'],   //'original'(default) | 'compressed'
            callback: (res) => {
              if (mode == 'rectangle') {
                console.log("crop callback:" + res)
                wx.previewImage({
                  current: '',
                  urls: [res]
                })
              }
              else {
                wx.showModal({
                  title: '',
                  content: JSON.stringify(res),
                })
              }

              // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
            }
          })
        }
      })
  }
})