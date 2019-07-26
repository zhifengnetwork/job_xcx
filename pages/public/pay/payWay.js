// pages/public/pay/payWay.js
import ServerData from '../../../utils/serverData.js';
const util = require('../../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [ 
      { name: '1', value: '余额支付', checked: 'true'  },
      { name: '2', value: '微信支付' }
    ],
    way:1,
    pBgC: '',                            //动态获背景颜色   
    styleBg:'',                              //动态添加style
    vip_type:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viptype =""
    if(options){
      viptype =options.vip_type
    }
    this.setData({
      pBgC: util.loginIdentity().pBgC,
      styleBg: util.loginIdentity().styleBg,
      vip_type:viptype
    })
  },
  selectPay: function (e) {       //性别
    this.setData({
      way: e.detail.value
    })
  },

  openVip(){
      var _opt ={
        'vip_type': this.data.vip_type,
        'pay_type':this.data.way
      }
      ServerData.registerVip(_opt).then((res) =>{
          if(res.data.status==1){
              ServerData._wxTost(res.data.msg)
              setTimeout(() =>{
                  wx:wx.navigateBack({
                    delta: 1,
                  })
              },1000)
          } 
          else if (status == -1) {
              wx.redirectTo({
                url: '../../login/login'
              })
          } 
          else {
              ServerData._wxTost(res.data.msg)
          }

          
          console.log(res.data)
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