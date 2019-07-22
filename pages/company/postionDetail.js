// pages/company/postionDetail.js
import ServerData from '../../utils/serverData.js';
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id:'1',
    type:'1',
    personal:[]
  },
  callWithHim:function(){
    wx.makePhoneCall({
      phoneNumber: '18365478951' // 仅为示例，并非真实的电话号码
    })
  },
  toReservation:function(){
    wx.showToast({
      title: '预订成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 收藏/取消收藏
  Oncollect:function() {
    var that = this,  
    // type = wx.getStorageSync('savePostion'), 
    Id = that.data.Id;
    // 要传给后台的参数
    var _opt = { 
      'type':type,
      'to_id':Id
    }
    ServerData.collection(_opt).then((res) => {
      if(res.data.status == 1){
        // 轻提示调用
        ServerData._wxTost(res.data.msg)
      }else{
        ServerData._wxTost(res.data.msg)
      }
    });
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