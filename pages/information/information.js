// pages/information/infomation.js
const app =getApp();
const util = require('../../utils/util.js');  //通用方法
Page({
  data: {
    cStatus:0,
    array:[
      {
        title:"江南皮革厂王主管",
        msg:"江南皮革厂倒闭了黄说江南皮革厂倒闭了黄说好江南皮革厂倒闭了黄说好好的",
        time:"12:25",
        isChang:true
      },
      {
        title: "江南皮革厂王主管2",
        msg: "江南皮革厂倒闭了黄说江",
        time: "22:25",
        isChang: true
      }
    ],
    array2: [
      {
        title: "消息江南皮革厂王主管",
        msg: "江南闭了黄说好好的",
        time: "12:25",
        isChang: true
      }
    ]
  },
  changNew:function(e){
    var index =e.currentTarget.dataset.index;
    this.data.array[index].isChang=false;
    this.setData({ array: this.data.array})
  },
  changNew2: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.array2[index].isChang = false;
    this.setData({ array2: this.data.array2 })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);   //获取底部导航
  },
  changStatus:function(e){
    console.log(e);
    this.setData({
      cStatus:e.currentTarget.dataset.status
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