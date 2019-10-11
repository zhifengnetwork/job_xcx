// pages/userInfo/search.js
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cStatus: 0,
      kw:'',
      rows:200,
      page:1,
      list:[],
      isShowInfo: false,
      pColor:'',                            //动态获字体颜色     
      pBgC: '',                            //动态获背景颜色                 
      pBC1: '',                            //动态获边框颜色  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          pColor: util.loginIdentity().pColor,
          pBC1: util.loginIdentity().pBC1,
          pBgC: util.loginIdentity().pBgC
        // resType: util.loginIdentity().resType,
      })
  },

  searchInfp(){
    var that = this,
    _opt ={
      kw:that.data.kw,
      rows:that.data.rows,
      page:that.data.page
    }
    ServerData.searchInfp(_opt).then((res) => {
      if (res.data.status == 1) {
        var status = false
        if (res.data.data.recruit.length < 1 && res.data.data.person.length < 1) {
          status = true
        }
        that.setData({ 
          list: res.data.data,
          isShowInfo:status
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
  changStatus: function (e) {
    this.setData({
      cStatus: e.currentTarget.dataset.status
    })
  },
  selecKeyWord(e){
      this.setData({
        kw: e.detail.value
      })
      this.searchInfp()
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