
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
    status: false,
    timer: '', //定时器名字
    fasongtext: '发送验证码',
    tangchu: false, //是否显示弹出框
    codeIsCanClick: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.timer);//页面销毁时清理定时器
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
  },
  deletetext: function(e) {

    this.setData({
      inputValue: '',
      status: false
    })
  },
  getVale: function(e) {
    this.data.input1text = ''
    if (e.detail.value != '') {
      this.setData({
        status: true,
        input1text: e.detail.value
      })
    } else {
      this.setData({
        status: false
      })

    }
  },
 // 倒计时函数
  clickCode: function () {
    var that = this;
    settime(that)
  },

  fasongma: function() {
    this.countDown();
  },
  // 点击完成出现弹框
  complete: function() {
    this.setData({
      tangchu: true
    })
    var that=this
    setTimeout(function() {
      that.setData({
        tangchu: false
      })
    }, 1000)

   setTimeout(function(){
     wx.redirectTo({
       url: '../login/login',
     })
   },1500)
  },
})

// 倒计时事件 单位s
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      codeIsCanClick: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      codeIsCanClick: false,
      last_time: countdown
    })
    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }, 1000)
}