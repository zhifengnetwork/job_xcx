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
    interval: 3000,
    duration: 1000,
  },
  onShow:function(){
      // var pos
      // app.editTabBar();
    var postion = wx.getStorageSync('savePostion');
    if (postion == 0) {
      app.editTabBar();
    } else if (postion == 1) {
      app.editTabBar1();
    } else if (postion == 2) {
      app.editTabBar2();
    } else {
      app.editTabBar3();
    }
    console.log(postion)
  },
  tologs: function () {     //按钮的绑定事件，点击跳转至logs
    wx.redirectTo({
      url: '../userInfo/myInfo',
    })
  },
  onLoad: function () {
    // app.editTabBar();
    var postion = wx.getStorageSync('savePostion');
    if (postion == 0) {
      app.editTabBar();
    } else if (postion == 1) {
      app.editTabBar1();
    } else {
      app.editTabBar2();
    }
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
