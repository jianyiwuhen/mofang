const app = getApp()
// pages/mfIndex/mfIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     companyName:'章鱼小丸子',
     companyImg: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
     companyPhone:'13524233134',
     stars: [0, 1, 2, 3, 4],
     normalSrc: '../images/normal.png',
     selectedSrc: '../images/selected.png',
     halfSrc: '../images/half.png',
     pingfen:'4',
     ciType:'1',
     goodNum:0,
     totalPrice:0,
     goodsList:[{
          goodsName:"白菜",
          goodsPrice:'10.0',
          goodsImg:'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
          menuType:'1',
          goodsId:'10',
          goodsNum:'1000'
     }, {
       goodsName: "白菜3",
       goodsPrice: '10.0',
       goodsImg: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
       menuType: '1',
       goodsId: '10'
       }, {
         goodsName: "白菜4",
         goodsPrice: '10.0',
         goodsImg: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
         menuType: '1',
         goodsId: '10'
     }, {
       goodsName: "青菜1",
       goodsPrice: '10.0',
       goodsImg: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
       menuType: '2',
       goodsId: '10'
       }, {
         goodsName: "青菜2",
         goodsPrice: '10.0',
         goodsImg: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
         menuType: '2',
         goodsId: '10'
     }, {
       goodsName: "青菜3",
       goodsPrice: '10.0',
       goodsImg: 'http://img3.imgtn.bdimg.com/it/u=689314955,515992096&fm=27&gp=0.jpg',
       menuType: '2',
       goodsId: '10'
     }],
     menuList:[{
           menuName:'test1',
           menuType:1
     },
       {
         menuName: 'test2',
         menuType: 2
       }
       ,
       {
         menuName: '为色即是',
         menuType: 3
       },{
         menuName: 'test5',
         menuType: 5 
       }
       ,
       {
         menuName: 'test4',
         menuType: 4
       }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '' })
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      screenHeight: app.globalData.systemInfo.windowHeight
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
  //改变查看类型
  changeTab:function(t){
     this.setData({
       ciType:t.target.dataset.type
     })
  }
})