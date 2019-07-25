// pages/userInfo/myPurse.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    savaStatus: 1,
    saveMoney: 10,
    num:'',
    selectMsg:'月',
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getMyPurse()
  },
  getMyPurse(){
      ServerData.myPurse({}).then((res) => {
          console.log(res)
          var data =res.data.data
        console.log(data)
        this.setData({ 
          list: data,
          saveMoney: data.month_money,
          num: data.month_num
        })
      })
  },
  setInfo(){
     
  },
  changSelect: function (e) {
    var that =this,
        status = e.currentTarget.dataset.status,
        money="",
        msg ="",
        num=''
    if (status==1){
      money = that.data.list.month_money
      num = that.data.list.month_num
      msg="月"
    }
    if (status == 2) {
      money = that.data.list.quarter_money
      num = that.data.list.quarter_num
      msg = "季"
    }
    if (status == 3) {
      money = that.data.list.year_money
      num = that.data.list.year_num
      msg = "年"
    }
    this.setData({ 
      savaStatus: status,
      saveMoney: money,
      num:num,
      selectMsg:msg
    });
  },
  // toPays: function (e) {
  //   var _opt={
      
  //   }
  //   ServerData.registerVip(_opt).then((res) => {

  //   })
  //   wx.showLoading({
  //     title: '跳转中...',
  //   })

  //   setTimeout(function () {
  //     wx.hideLoading()
  //   }, 2000)
  // },
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