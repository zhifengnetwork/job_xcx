// pages/company/postionDetail.js
import ServerData from '../../utils/serverData.js';
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id:'2',
  },
  callWithHim:function(){
    wx.makePhoneCall({
      phoneNumber: '18365478951' // 仅为示例，并非真实的电话号码
    })
  },
  // 收藏/取消收藏
  Oncollection:function() {
    var that = this,
    toId = that.data.toId;
    wx.request({
      url:app.globalData.baseUrl+'/collection/collection',
      data:{
        token:wx.getStorageSync('token'),
        type:wx.getStorageSync('savePostion'),
        to_id:toId
      },
      method:'post',
      success:(res)=>{
        console.log(res)
        if (res.data.status == 1) {
            
        }
      }
    })
  },
  // 公司职位详情数据
  TheDetails:function() {
    var that = this,
    Id = that.data.Id;
    wx.request({
      url:app.globalData.baseUrl+'/company/recruit_detail',
      data:{
        token:wx.getStorageSync('token'),
        // type:wx.getStorageSync('savePostion'),
        id:Id
      },
      method:'post',
      success:(res)=>{
        console.log(res)
        if (res.data.status == 1) {
            
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.TheDetails();
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