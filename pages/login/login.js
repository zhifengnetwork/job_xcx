Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
    status: false,
    eyekai: true,
    leixing: 'password',
    input1text: '',
    input2text: '',
    color: '#ccc',
    // mobile:"",
    password:""

  },
  getMobile:function(e){
    // var val =e.detail.value;
    // this.setData({ mobile:val})\
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
  getPassword: function (e) {
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
    var val = e.detail.value;
    this.setData({ password: val })
  },
  toLogin:function(){
     if(this.data.password=='123456'){
       wx.navigateTo({
         url: '../index/index'
       })
     }else{
        wx.navigateTo({
          url: '../company/company'
        })
     }
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
  qie: function() {
    if (this.data.eyekai == false) {
      this.setData({
        eyekai: true,
        leixing: 'password'
      })
    } else {
      this.setData({
        eyekai: false,
        leixing: 'text'
      })
    }
  },
  deletetext: function(e) {

    this.setData({
      inputValue: '',
      status: false
    })
  },
  forget:function(){
    wx.navigateTo({
      url: '../forgetpassword/forgetpassword',
    })
  },
  resister:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  }



})