Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeIsCanClick: true,
    input1text: '',
    input2text: '',
    color: '#ccc',
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [
      {name:'个人',id:0}, 
      {name:'企业',id:1},
      {name: '第三方',id:2} 
    ],//下拉列表的数据
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
    settime(that)
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
  personal:function(e){
    var index =this.data.index;
    var id = this.data.selectData[index].id
    if(id==0){
      wx.navigateTo({
        url: '../personalMessage/personalMessage'
      })
    }else{
      wx.navigateTo({
        url: 'fillInInformation/fillInInformation'
      })
    }
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