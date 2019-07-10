Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
    status: false,
    eyekai: 0,
    is_pwd:'password',
    input1text: '',
    input2text: '',
    color: '#ccc',
    password:"",
    mobile:''
  },
  getMobile:function(e){
    var color= '#ccc';
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
      return
    }
    if (!(this.data.input2text == '' || this.data.input1text == '')){
      color= 'rgb(54, 193, 186)';
    }
    this.setData({
      color: color,
      mobile: e.detail.value
    })
  },
  getPassword: function (e) {
    var color = '#ccc';
    this.data.input2text = ''
    if (e.detail.value != '') {
      this.setData({
        input2text: e.detail.value
      })
    }
    if (!(this.data.input2text == '' || this.data.input1text == '')) {
      color = '#ff54b5';
    }
    var val = e.detail.value;
    this.setData({ 
      password: val,
      color: color
    })
  },
  toLogin:function(){     //保存用户身份用
    var status = "";
    var password = this.data.password;
    var mobile = this.data.mobile;
    var reg = /^1[3|4|5|7|8]\d{9}$/;
    if (password ==0){
       status =0;
    } 
    if (password == 1) {
      status = 1;
    } 
    if (password == 2) {
      status = 2;
    } 
    if (password == 3) {
      status = 3;
    } 

    if (!(mobile == "" || password=="")){
      if(!reg.test(mobile)){
        return wx.showToast({
          title: '手机号格式不正确哦!',
          icon: 'none'
          // duration: 1000
        })
      }
      wx.redirectTo({         //跳转至首页
        url: '../index/index'
      })
      wx.setStorageSync('savePostion', status)
    }else{
        return wx.showToast({
          title: '请输入完整信息',
          icon: 'none'
        })
    }
  },
  toVisitor:function(){   //游客入口
    wx.setStorageSync('savePostion', 0)
    wx.redirectTo({
      url: '../index/index'
    })
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
  showPassword: function(e){
    var newid=0;
    var that = this;
    var id = e.currentTarget.dataset.id;
    if(id==0){
      newid =1
    }
    var is_pwd = !that.data.is_pwd

    this.setData({
      is_pwd: is_pwd,
      eyekai: newid,
    })
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