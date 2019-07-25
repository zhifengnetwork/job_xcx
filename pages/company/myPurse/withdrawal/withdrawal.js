// pages/userInfo/withdrawal.js
import ServerData from '../../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveStatus: 2, //支付类型 2 微信、4支付宝
    info: {},
    sxf:0, // 手续费   
    txmoney:'', // 提现金额
    num: 2  // 支付宝账户框
  },


  changWithdrawal: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      saveStatus: status,
      num: status
    })


    // let id = e.currentTarget.dataset.id,
    //   index = parseInt(e.currentTarget.dataset.index),
    //   num = parseInt(e.currentTarget.dataset.index)
    // this.curIndex = parseInt(e.currentTarget.dataset.index)
    // console.log(e)
    // var that = this
    // this.setData({
    //   curNavId: id,
    //   curIndex: index,
    //   num: index
    // })

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
    console.log(this.data.info.percent)
    this.setData({ txmoney: e.detail.value, sxf: sxf })
  },
  getWithdrawal(){
      var that =this
      ServerData.goWithdrawal({}).then((res) => {
        if(res.data.status==1){
          that.setData({
             info: res.data.data
          })
        } else if (res.data.status == -1){
            wx.redirectTo({
              url: '../../login/login'
            })
        }else{
          ServerData._wxTost(res.data.msg)
        }
        
        console.log(res)
      })
  },

  setInfo(){
    var that = this
    if (that.data.txmoney > that.data.info.max_money) {
      return ServerData._wxTost('单笔提现金额不能大于' + that.data.info.max_money)
    }
    if (that.data.txmoney == "") { return ServerData._wxTost('请输入提现金额')}
    var _opt ={
      'pay_tpye': that.data.saveStatus,
      'money': that.data.txmoney,
      'alipay': that.data.info.alipay,
      'alipay_name': that.data.info.alipay_name,

    }
    ServerData.withdrawal(_opt).then((res) => {
      if (res.data.status == 1) {
        // that.setData({
        //   info: res.data.data
        // })
          ServerData._wxShowLoading(res.data.msg)
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

// // pages/userInfo/withdrawal.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     saveStatus: 0,
//     num: 0
//   },

//   changWithdrawal: function (e) {
//     var status = e.currentTarget.dataset.status;
//     this.setData({
//       saveStatus: status,
//       num: status
//     })


//     // let id = e.currentTarget.dataset.id,
//     //   index = parseInt(e.currentTarget.dataset.index),
//     //   num = parseInt(e.currentTarget.dataset.index)
//     // this.curIndex = parseInt(e.currentTarget.dataset.index)
//     // console.log(e)
//     // var that = this
//     // this.setData({
//     //   curNavId: id,
//     //   curIndex: index,
//     //   num: index
//     // })

//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })