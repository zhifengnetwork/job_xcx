// pages/userInfo/myPurse.js
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    savaStatus:0,
    pColor: '',                           //动态获取字体颜色
    pBgC: '',                             //动态获背景颜色                 
    pBC1: '',                             //动态获边框颜色 
    gActive: '',                           //动态获高亮颜色 
    vip_type:1 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pBgC: util.loginIdentity().pBgC,
      pColor: util.loginIdentity().pColor,
      pBC1: util.loginIdentity().pBC1,
      gActive: util.loginIdentity().gActive
    })
  },
  changSelect:function(e){
    var status =e.currentTarget.dataset.status;
    this.setData({savaStatus:status});
  },
  toPays:function(e){
    wx.showLoading({
      title: '跳转中...',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
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

  }
})