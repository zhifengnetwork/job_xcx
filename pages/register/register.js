Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeIsCanClick: true,
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
    //clearInterval(this.data.timer);//页面销毁时清理定时器
    clickCode(); 
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
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () { //这里把setInterval赋值给变量名为timer的变量
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
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  personal:function(){

    wx.navigateTo({
      url:'../personalMessage/personalMessage'
    })

  }
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