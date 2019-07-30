// pages/userInfo/withdrawal.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveStatus: 2,                      //支付类型 2 微信、4支付宝
    info: {},
    alipay: '',
    alipay_name: '',
    sxf:0,                              // 手续费   
    txmoney:'',                         // 提现金额
    num: 2                              // 支付宝账户框
  },

  setInpuVal(e) {
    // console.log(e)
    this.setData({
      alipay_name: e.detail.value
    })
  },
  setInpuVal2(e) {
    // console.log
    this.setData({
      alipay: e.detail.value
    })
  },
  changWithdrawal: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      saveStatus: status,
      num: status
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWithdrawal()
  },
  getMoney(e){
    var t = e.detail.value
    var sxf = new Number(this.data.info.percent/100) * new Number(e.detail.value).toFixed(2)
    this.setData({ txmoney: e.detail.value, sxf: sxf })
  },
  getWithdrawal(){
      var that =this
      ServerData.goWithdrawal({}).then((res) => {
        if(res.data.status==1){
          that.setData({
             info: res.data.data,
             alipay: res.data.data.alipay,
             alipay_name: res.data.data.alipay_name
          })
        } else if (res.data.status == -1){
            wx.redirectTo({
              url: '../../login/login'
            })
        }else{
          ServerData._wxTost(res.data.msg)
        }
        
        // console.log(res)
      })
  },

  setInfo(){
    var that = this,
      alipay_name = that.data.alipay_name,
      alipay = that.data.alipay

    if (that.data.saveStatus == 4) {
      if (alipay_name == "" || alipay == "") {
        return ServerData._wxTost('请输入支付宝信息')
      }
    }
    if (that.data.txmoney > that.data.info.max_money) {
      return ServerData._wxTost('单笔提现金额不能大于' + that.data.info.max_money)
    }
    if (that.data.txmoney == "") { return ServerData._wxTost('请输入提现金额')}
    var _opt ={
      'pay_tpye': that.data.saveStatus,
      'money': that.data.txmoney,
      'alipay': alipay,
      'alipay_name': alipay_name,

    }
    ServerData.withdrawal(_opt).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.redirectTo({
            url: '../userCenter/userCenter'
          })
        }, 1000)
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }

      console.log(res)
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