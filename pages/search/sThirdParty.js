// pages/userInfo/search.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    rows: 200,
    page: 1,
    list: [],
    isShowInfo:false,
    pBgC: '',                            //动态获背景颜色                 
    pBC1: '',                            //动态获边框颜色  
    resType: ''                          //动态登陆者的标签：默认为字符串
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pColor: util.loginIdentity().pColor,
      pBC1: util.loginIdentity().pBC1,
      pBgC: util.loginIdentity().pBgC,
      resType: util.loginIdentity().resType,
    })
  },

  searchInfp() {
    var that = this,
      _opt = {
        kw: that.data.kw,
        rows: that.data.rows,
        page: that.data.page
      }
    ServerData.searchInfp(_opt).then((res) => {
      if (res.data.status == 1) {
        that.setData({ list: res.data.data })
        var status =false;
        if (res.data.data.recruit.length < 1) {
          var status= true
        }

        that.setData({
          isShowInfo: status
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    });
  },
  selecKeyWord(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})