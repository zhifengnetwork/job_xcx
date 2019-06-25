Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeIsCanClick: false,
    //fasongtext: '发送验证码',
    input1text: '',
    input2text: '',
    color: '#ccc',
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['个人', '企业'],//下拉列表的数据
    index: 0 //选择的下拉列表下标

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getVale: function (e) {
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
    if (e.detail.value != '' && this.data.input2text != '') {
      this.setData({
        color: 'rgb(54, 193, 186)'
      })
    }
    if (e.detail.value == '' || this.data.input1text == '') {
      this.setData({
        color: '#ccc'
      })
    }

  },
  getVale2: function (e) {
    this.data.input2text = ''
    if (e.detail.value != '') {
      this.setData({
        input2text: e.detail.value
      })
    }
    if (this.data.input1text != '' && e.detail.value != '') {
      this.setData({
        color: 'rgb(54, 193, 186)'
      })
    }
    if (e.detail.value == '' || this.data.input1text == '') {
      this.setData({
        color: '#ccc'
      })
    }

  },
  fasongma: function () {
    this.countDown();
  },
  deletetext: function (e) {
    this.setData({
      inputValue: '',
      status: false
    })
  },
  /**
 * 点击验证码按钮
 */
  clickCode: function () {
    var that = this;
    var countDownNum = '10'; //倒计时初始值
    that.setData({
      codeIsCanClick:true,
      timer: setInterval(function () {
        countDownNum--;
        // that.setData({
        //   countDownNum: countDownNum
        // })
        that.setData({
          fasongtext: countDownNum + 's'
        })
        if (countDownNum == 0) {
          clearInterval(that.data.timer);
          that.setData({
            fasongtext: '发送验证码'
          })
        }
      }, 1000)
    })
  },
 saveInfo: function () {
    wx.navigateTo({
      url: '../public/setting'
    })
  },
})