// pages/public/password.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pColor: '',                          //动态获取字体颜色
    pBgC: '',                            //动态获背景颜色                 
    pBC1: '',                             //动态获边框颜色   
    pswd:'',
    pswd2:''
  },
  saveInfo: function () {
    var _opt={
      'password1': this.data.pswd,
      'password2': this.data.pswd2
    }
    ServerData.editPassword(_opt).then((res) => {
      if (res.data.status == 1 || res.data.status == -1) {
        console.log(res)
        wx.navigateTo({
          url: '../login/login'
        })
      } 
      ServerData._wxTost(res.data.msg)
    });
  },
  getPassword(e){
    this.setData({pswd: e.detail.value,})
  },
  getPassword2(e) {
    this.setData({
      pswd2: e.detail.value,

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pBgC: util.loginIdentity().pBgC,
      pBC1: util.loginIdentity().pBC1
    })
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