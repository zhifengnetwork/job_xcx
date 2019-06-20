//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mode: "scaleToFill",
    arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
  },
  onLoad: function () {
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
