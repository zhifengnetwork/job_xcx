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
  countDown: function() {
    var that = this;
    var countDownNum = '60'; //倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        that.setData({
          fasongtext: countDownNum + 's'
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            fasongtext: '发送验证码'
          })
        }
        console.log(countDownNum);


      }, 1000)

    })
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

  },
 


})