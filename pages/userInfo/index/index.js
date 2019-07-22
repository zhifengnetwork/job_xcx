//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');  //通用方法
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
  onShow: function () {

  },
  onLoad: function () {
    util.getStorageItem('savePostion', app)   //获取底部导航
    //轮播图数据
    var array = this.data.arr
    for (let i = 0; i < 3; i++) {
      array.push("img/" + i + ".jpg")
    }
    this.setData({
      arr: array
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
