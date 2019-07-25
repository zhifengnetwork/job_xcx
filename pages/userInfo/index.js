//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');  //通用方法
Page({
  data: {
    mode: "scaleToFill",
    statusBarHeight: app.globalData.statusBarHeight,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },

  onLoad: function () {
    util.getStorageItem('savePostion', app)   //获取底部导航
  },

  getUserInfo: function () {               //获取主页数据
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
