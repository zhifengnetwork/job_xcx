//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mode: "scaleToFill",
    statusBarHeight: app.globalData.statusBarHeight,
    arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
  },
  onShow:function(){

      app.editTabBar();
  },
  tologs: function () {     //按钮的绑定事件，点击跳转至logs
    wx.redirectTo({
      url: '../userInfo/myInfo',
    })
  },
  onLoad: function () {
    app.editTabBar();
    var array = this.data.arr
    for (let i = 0; i < 3; i++) {
      array.push("img/" + i + ".jpg")
    }
    this.setData({ arr: array })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
